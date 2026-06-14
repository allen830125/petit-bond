'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoryPage() {
  const router = useRouter();

  return (
    <div className="bg-cream-100">
      {/* HERO BANNER */}
      <div className="bg-pb-forest text-cream-200 py-[clamp(60px,8vw,100px)]">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
          <div className="font-cormorant italic text-[clamp(15px,1.6vw,18px)] text-gold-400 tracking-widest mb-4">
            Our story
          </div>
          <h1 className="font-serif font-semibold text-[clamp(32px,5vw,48px)] leading-[1.3] text-cream-200 mb-4">
            小小的羈絆
            <br />
            戴在你和牠身上
          </h1>
          <p className="font-cormorant italic text-[clamp(14px,1.5vw,16px)] text-gold-400 max-w-[600px] mx-auto">
            一顆顆手工串起的珍珠，承載著人與寵物之間的無聲陪伴
          </p>
        </div>
      </div>

      {/* MAIN STORY SECTION */}
      <div className="bg-cream-100">
        <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(56px,7vw,96px)]">
          <div className="flex flex-wrap gap-[clamp(32px,5vw,72px)] items-center">
            {/* IMAGE */}
            <div className="flex-1 basis-[300px]">
              <Image
                src="/images/pouch-bracelet.jpg"
                alt="編織手鏈與絨布袋"
                width={400}
                height={500}
                className="w-full rounded-[18px] shadow-[0_30px_60px_-34px_rgba(30,50,40,.45)]"
              />
            </div>

            {/* TEXT */}
            <div className="flex-1 basis-[380px]">
              <h2 className="font-serif font-semibold text-[clamp(15px,1.6vw,18px)] text-gold-500 tracking-wider mb-[18px]">
                一針一線，手工串起
              </h2>

              <p className="font-noto-sans-tc text-taupe-600 text-[clamp(14px,1.5vw,16px)] leading-[2.05] mb-6">
                Petit Bond 始於一個簡單的念想：把相同的珍珠與天然石材，分別串成人手鏈與寵物項鍊。這不只是配飾，更是連結——每一條都代表著人與寵物之間，那份看得見的陪伴。
              </p>

              <p className="font-noto-sans-tc text-taupe-600 text-[clamp(14px,1.5vw,16px)] leading-[2.05] mb-8">
                每件作品都以天然珍珠與晶石手工製作，沒有機器流水線。我們堅持選用最好的材料，不趕工期，只為了讓每條項鍊和手鏈都能陪伴你們更久。
              </p>

              <div className="space-y-4">
                <p className="font-noto-sans-tc text-taupe-500 text-[13.5px] leading-[1.9]">
                  <span className="font-semibold text-taupe-700">Petit Bond</span>
                  ，源自法文「小小的羈絆」。我們相信，最珍貴的情感，往往體現在最日常的陪伴中。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THREE FEATURES SECTION */}
      <div className="bg-cream-50">
        <div className="max-w-[1120px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(56px,7vw,96px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(32px,4vw,48px)]">
            {/* FEATURE 1 */}
            <div className="text-center">
              <div className="font-cormorant text-[34px] text-pb-green font-semibold mb-4">
                01
              </div>
              <h3 className="font-serif font-semibold text-[clamp(20px,2vw,26px)] text-taupe-800 mb-4">
                人寵成對
              </h3>
              <p className="font-noto-sans-tc text-taupe-600 text-[14px] leading-[1.9]">
                同一批珍珠與天然石材，為你和牠打造成對配飾。互相呼應的設計，象徵著你們之間的特殊羈絆。
              </p>
            </div>

            {/* FEATURE 2 */}
            <div className="text-center">
              <div className="font-cormorant text-[34px] text-pb-green font-semibold mb-4">
                02
              </div>
              <h3 className="font-serif font-semibold text-[clamp(20px,2vw,26px)] text-taupe-800 mb-4">
                天然珍珠
              </h3>
              <p className="font-noto-sans-tc text-taupe-600 text-[14px] leading-[1.9]">
                精選淡水珍珠與高品質天然晶石，每顆都有獨特的光澤與紋理。經得起時間考驗的美。
              </p>
            </div>

            {/* FEATURE 3 */}
            <div className="text-center">
              <div className="font-cormorant text-[34px] text-pb-green font-semibold mb-4">
                03
              </div>
              <h3 className="font-serif font-semibold text-[clamp(20px,2vw,26px)] text-taupe-800 mb-4">
                可客製化
              </h3>
              <p className="font-noto-sans-tc text-taupe-600 text-[14px] leading-[1.9]">
                長度、配色、材質——根據你和牠的需求客製。沒有兩條相同的 Petit Bond。
              </p>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="flex justify-center mt-[clamp(48px,6vw,72px)]">
            <button
              onClick={() => router.push('/shop')}
              className="cursor-pointer bg-pb-green text-cream-200 px-10 py-4 rounded-pill font-medium text-[14px] tracking-widest hover:shadow-lg transition-all"
            >
              看看所有手作
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
