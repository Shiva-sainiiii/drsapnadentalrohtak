export const cld = (u, w = 900) => (u && u.includes('res.cloudinary.com') && u.includes('/upload/') ? u.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`) : u);
export const vthumb = (u) => u.replace('/upload/', '/upload/so_0,f_jpg,w_700/').replace(/\.\w+$/, '.jpg');
