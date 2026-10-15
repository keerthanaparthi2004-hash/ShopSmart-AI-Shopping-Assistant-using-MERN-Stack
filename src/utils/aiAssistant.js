export const parseQuery = (text) => {
  const lower = text.toLowerCase().trim();
  const greetings = ['hi','hello','hey','hii','helo','vanakkam','hai'];
  if (greetings.includes(lower)) return { isGreeting: true };
  return { isGreeting: false, searchText: lower };
};

const fixTypos = (word) => {
  const typos = {
    'bottol': 'bottle', 'bottal': 'bottle', 'bottel': 'bottle', 'botel': 'bottle', 'botal': 'bottle', 'bottile': 'bottle',
    'watter': 'water', 'woter': 'water', 'vater': 'water', 'waterr': 'water',
    'beuty': 'beauty', 'buty': 'beauty', 'baatuy': 'beauty',
    'fone': 'phone', 'phon': 'phone', 'mobail': 'mobile',
    'laptap': 'laptop'
  };
  return typos[word] || word;
};

export const getSuggestions = (products, queryObj, cart=[], wishlist=[]) => {
  if (queryObj.isGreeting) {
    return {
      message: "Vanakkam! 🙏 Welcome! Enna venum sollunga? What do you need?\nPhone, Beauty, Water Bottle, Fashion - Tamil la kooda ketkalam! ",
      products: []
    };
  }

  const search = queryObj.searchText;
  let filtered = [...products];
  let budget = null;

  const budgetMatch = search.match(/(\d+)/);
  if (budgetMatch) {
    budget = parseInt(budgetMatch[1]);
    if (budget >= 50 && budget <= 100000) filtered = filtered.filter(p => p.price <= budget);
  }

  if (search.includes('suggest') || search.includes('recommend') || search.includes('gift') || search.includes('cheaper') || search.includes('wishlist') || search.includes('cart')) {
    if (wishlist.length > 0) {
      const wishCat = wishlist[0].category;
      const topRated = products.filter(p => p.category === wishCat).sort((a,b) => b.rating - a.rating).slice(0,4);
      if (topRated.length > 0) {
        return { message: `Top-rated item in your wishlist category ma! Unga wishlist la ${wishCat} irukku ma, athula best rating ma! 👇`, products: topRated };
      }
    }
    if (cart.length > 0) {
      const cartCat = cart[0].category;
      const cheaper = products.filter(p => p.category === cartCat && p.price < cart[0].price).slice(0,4);
      if (cheaper.length > 0) {
        return { message: `A cheaper alternative in your cart category ma! Unga cart la ${cartCat} ku cheap-a irukku ma! 👇`, products: cheaper };
      }
    }
  }

  let cleanSearch = search.replace(/enakku|enaku|venum|kulla|ku|oru|nalla|best|kku|ethu/gi, '').trim();
  let words = cleanSearch.split(' ').filter(w => w.length > 2 && isNaN(w)).map(w => fixTypos(w));

  const hasBottleWord = words.some(w => w.includes('bott') || w === 'bottle');
  const hasWaterWord = words.some(w => w.includes('wat') || w === 'water');

  if (hasBottleWord || hasWaterWord) {
    words = ['water', 'bottle', 'groceries'];
  }

  if (words.length > 0) {
    filtered = filtered.filter(p => {
      const title = p.title.toLowerCase();
      const category = p.category.toLowerCase();
      return words.some(word => {
        return title.includes(word) || category.includes(word) ||
               word.length > 3 && (title.includes(word.slice(0, -1)) || title.includes(word.slice(0, 3)));
      });
    });
  }

  if (filtered.length === 0) {
    const fallback = products.filter(p =>!budget || p.price <= budget).slice(0, 4);
    return {
      message: `Ayyo ma, "${search}" ku exact-a kidaikala ma! But similar-a ${fallback.length} best products irukku ma! Check pannunga ma! 👇`,
      products: fallback
    };
  }

  if (search.includes('best') || search.includes('top') || search.includes('nalla')) {
    filtered = filtered.sort((a,b) => b.rating - a.rating);
  }

  let reply = "";
  if (hasBottleWord || hasWaterWord) {
    reply = `Ungalukku water bottle ku ${filtered.length} products irukku ma! Found ${filtered.length} water bottles ma - Pure water ma, ${filtered[0]?.price} only ma! 👇`;
  } else if (budget) {
    reply = `₹${budget} la "${words.join(' ')}" ku ${filtered.length} products irukku ma! Found ${filtered.length} products under ₹${budget} ma! 👇`;
  } else {
    reply = `Ungalukku "${words.join(' ')}" ku ${filtered.length} products kidaichirukku ma! Found ${filtered.length} for "${words.join(' ')}" ma! 👇`;
  }

  return { message: reply, products: filtered.slice(0, 4) };
};
