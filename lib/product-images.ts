import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export interface ParsedProductForm {
  data: {
    series: string;
    seriesName: string;
    name: string;
    sub: string;
    description: string;
    bracelet: string;
    necklace: string;
    pair: string;
    stones: string[];
  };
  newImageFiles: File[];
  keepImageIds: string[];
}

export function parseProductFormData(formData: FormData): ParsedProductForm | { error: string } {
  const series = formData.get('series');
  const seriesName = formData.get('seriesName');
  const name = formData.get('name');
  const sub = formData.get('sub');
  const description = formData.get('description');
  const bracelet = formData.get('bracelet');
  const necklace = formData.get('necklace');
  const pair = formData.get('pair');
  const stonesRaw = formData.get('stones');

  if (
    typeof series !== 'string' ||
    typeof seriesName !== 'string' ||
    typeof name !== 'string' ||
    typeof sub !== 'string' ||
    typeof description !== 'string' ||
    typeof bracelet !== 'string' ||
    typeof necklace !== 'string' ||
    typeof pair !== 'string' ||
    typeof stonesRaw !== 'string'
  ) {
    return { error: '缺少必要欄位' };
  }

  let stones: string[];
  try {
    stones = JSON.parse(stonesRaw);
  } catch {
    return { error: 'stones 格式錯誤' };
  }

  let keepImageIds: string[] = [];
  const keepImageIdsRaw = formData.get('keepImageIds');
  if (typeof keepImageIdsRaw === 'string' && keepImageIdsRaw) {
    try {
      keepImageIds = JSON.parse(keepImageIdsRaw);
    } catch {
      return { error: 'keepImageIds 格式錯誤' };
    }
  }

  const newImageFiles = formData.getAll('images').filter((v): v is File => v instanceof File);

  return {
    data: { series, seriesName, name, sub, description, bracelet, necklace, pair, stones },
    newImageFiles,
    keepImageIds,
  };
}

export async function uploadProductImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      throw new Error('僅支援 JPG、PNG、WebP、GIF 格式');
    }
    if (file.size > MAX_SIZE) {
      throw new Error('圖片大小不可超過 5MB');
    }
    const filename = `${randomUUID()}.${ext}`;
    const blob = await put(filename, file, { access: 'public' });
    urls.push(blob.url);
  }
  return urls;
}
