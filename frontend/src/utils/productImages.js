const folderMap = {
  'fsp1365-purple': 'printed-lawn-3pc-purple',
  'fse719-yellow': 'embroidered-chiffon-3pc-yellow',
  'fsp1359-pret-maroon': 'pret-jacquard-maroon',
  'fse707-black': 'embroidered-lawn-shawl-black',
  'fse710-purple': 'embroidered-chiffon',
  'fsp1354-pret-black': 'pret-embroidered',
  'fsp1330-pret-black': 'pret-embroidered',
  'fsp1294-pret-black': 'pret-embroidered',
  'fsp729-pret-blue': 'pret-printed-2pc',
  'fse703-green': 'printed-lawn-3pc',
  'fsp1321-charcoal': 'printed-lawn-3pc',
  'fse515-green': 'printed-lawn-3pc',
  'fse608-navy': 'embroidered-slub-khaddar-3pc',
  'fsp1397-white': 'pret-embroidered',
  'fsp1402-white': 'printed-lawn-3pc',
  'fsp1072-black': 'printed-lawn-3pc',
  'fse697-white': 'embroidered-chiffon',
  'fsp1002-black': 'printed-lawn-3pc',
  'fsp943-orange': 'printed-lawn-3pc',
  'fsp1193-maroon': 'printed-lawn-3pc',
  'fsp1176-rust': 'printed-lawn-3pc',
  'style-shawl': 'luxury-organza-shawl',
  'style-earrings': 'ivory-drop-earrings',
  'style-khussa': 'classic-embroidered-khussa',
  'pret-embroidered-2pc': 'pret-embroidered-2pc',
};

export function getProductFolder(id) {
  return folderMap[id] || null;
}

const imageCount = {
  'style-shawl': 2,
  'style-earrings': 1,
  'style-khussa': 2,
  'pret-embroidered-2pc': 3,
};

export function getProductImages(id) {
  const folder = getProductFolder(id);
  if (!folder) return null;
  const count = imageCount[id] || 3;
  return Array.from({ length: count }, (_, i) =>
    `/assets/images/clothes/${folder}/IMG${i + 1}.webp`,
  );
}

export const editorialStories = {
  'fsp1365-purple': 'Crafted for the woman who values understated luxury, this printed lawn three-piece brings together fluid silhouette and artisanal print work. The muted purple tones offer a refined palette that moves effortlessly from daylight gatherings to intimate evening occasions.',
  'fse719-yellow': 'Bathed in the warmth of golden saffron, this embroidered chiffon ensemble is a tribute to festive craftsmanship. Delicate embellishments dance across lightweight fabric, creating a piece that feels as breathable as it is breathtaking — made for celebrations that linger.',
  'fsp1359-pret-maroon': 'Deep maroon meets precise jacquard weaving in this pret ensemble built for impact. The structured fabric holds its form elegantly while the rich wine tone commands attention. Designed for occasions where you want your arrival remembered.',
  'fse707-black': 'A study in contrast and texture — this embroidered lawn shawl wraps you in quiet sophistication. The black base lets the intricate threadwork take centre stage, making it the perfect companion for both formal evenings and elevated casual moments.',
};
