# Tailwind

유틸리티(utility) 클래스로 이루어진 CSS 프레임워크

추가적인 CSS 코드 작성없이 단순히 HTML 요소의 `class` 속성에 설정해주는 것만으로도 스타일링이 가능하다.

<br>

프로젝트 셋팅 시, tailwind 기본 셋팅만으로도 개발이 가능했지만, DX 및 양질의 코드를 위해 아래 셋팅들을 추가하였다.

<br>

## 프로젝트 적용 사항 

- 반응형 기반 코드 추가
- 색상 상수화 기반 코드 추가
- className 정렬을 위한 `prettier-plugin-tailwindcss` 추가 ([참고 자료](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier))
- tailwind arbitrary-values 줄이기 (tailwind.config.ts 참고, [참고 자료](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/#arbitrary-values-줄이기))
- textStyle 설정 및 자동완성을 위한 custom plugin 적용 및 기반 코드 추가 ([참고 자료](https://tailwindcss.com/docs/plugins))

- 동적 할당을 위한 Twin.Macro와 함께 적용 고려 ([참고 자료](https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/#tailwind-css와-twinmacro))

> Vscode Extension: Tailwind CSS IntelliSense 설치 시, tailwind classname 자동완성 기능 사용 가능



### Code

```
// src/plugins/textStyle.ts
import plugin from 'tailwindcss/plugin';

export const TextStylePlugin = plugin(({ addUtilities }) => {
  // TODO: add text styles constants
  // example
  addUtilities({
    '.title-lg-regular': {
      'font-size': '32px',
      'font-weight': '400',
      'line-height': '46px',
      'letter-spacing': '-0.4px',
    },
    '.title-md-bold': {
      'font-size': '24px',
      'font-weight': '700',
      'line-height': '30px',
      'letter-spacing': '-0.4px',
    },
  });
});
```

```
// .prettierrc
{
	...,
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

```
// tailwind.config.ts
import { TextStylePlugin } from './src/plugins/textStyle';

import type { Config } from 'tailwindcss';

const px_unit_1 = {} as Record<string, string>;
for (let i = 0; i < 1000; i++) px_unit_1[i] = `${i}px`;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // TODO: 반응형 사이즈 결정
    screens: {
      mobile: { max: '991px' },
    },
    // TODO: add colors constants
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // example
      primary: {
        100: '',
        200: '',
      },
    },
    extend: {
      borderWidth: px_unit_1,
      fontSize: px_unit_1,
      lineHeight: px_unit_1,
      minWidth: px_unit_1,
      minHeight: px_unit_1,
      spacing: px_unit_1,
    },
  },
  plugins: [TextStylePlugin],
};

export default config;
```

