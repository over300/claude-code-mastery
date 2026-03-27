# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개발자 포트폴리오용 반응형 웹 이력서. HTML, CSS, JavaScript, TailwindCSS로 구현되는 정적 웹사이트입니다.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성 (README, 주석 등)
- **변수명/함수명**: 영어 사용 (코드 표준 준수)
- **코드 예시 및 설명**: 한국어로 설명하되, 코드는 표준 영어 표기법 유지

## 자주 사용하는 명령어

```bash
# 로컬 개발 서버 시작 (포트 8000)
npm run dev

# 빌드 (정적 사이트이므로 실질적인 빌드 불필요)
npm run build

# 린트 (향후 ESLint/Stylelint 추가 시)
npm run lint

# 테스트 (향후 테스트 프레임워크 추가 시)
npm run test
```

## 프로젝트 아키텍처

### 파일 구조

```
project/
├── index.html          # 메인 이력서 페이지 (모든 콘텐츠 포함)
├── css/
│   └── style.css      # TailwindCSS 커스텀 스타일 및 전역 스타일
├── js/
│   └── script.js      # DOM 조작, 이벤트 핸들링, 네비게이션 로직
├── assets/
│   ├── images/        # 프로필 사진, 프로젝트 이미지 등
│   └── files/         # 다운로드 가능한 PDF 이력서 등
└── ROADMAP.md         # 개발 계획 및 진행도
```

### 설계 원칙

1. **싱글 페이지 구조**: 모든 콘텐츠를 `index.html` 하나에 섹션 방식으로 구성
2. **반응형 우선**: TailwindCSS의 모바일 우선(`sm:`, `md:`, `lg:`) 기반 설계
3. **접근성**: 의미있는 시맨틱 HTML, ARIA 속성 사용
4. **성능**: 최소한의 JavaScript, 이미지 최적화, 빠른 로딩 속도

### 주요 섹션 (HTML)

| 섹션 | 목적 | 주요 요소 |
|------|------|---------|
| Header | 네비게이션 | 로고, 메뉴, 햄버거 아이콘 |
| Profile | 개요 | 프로필 이미지, 이름, 직무, 소개 |
| Experience | 경력 | 회사명, 직책, 기간, 설명 카드 |
| Skills | 기술스택 | 언어, 프레임워크, 도구 태그 |
| Portfolio | 프로젝트 | 프로젝트 카드, 설명, 링크 |
| Education | 학력/자격 | 학교명, 전공, 시기 |
| Contact | 연락처 | 이메일, 전화, SNS 링크 |
| Footer | 하단 | 저작권, 링크 |

### CSS 스타일링 전략

- **TailwindCSS 유틸리티**: 주요 스타일은 HTML의 class 속성으로 적용
- **커스텀 CSS** (`style.css`):
  - TailwindCSS 확장 (커스텀 색상, 폰트 등)
  - 복잡한 애니메이션
  - 버튼 호버, 카드 그림자 등 정교한 효과
- **색상 팔레트**: 주색(Primary), 보조색(Secondary), 중립색(Gray) 조합
- **반응형 클래스**: `sm:`, `md:`, `lg:`를 활용한 breakpoint별 스타일

### JavaScript 기능

| 기능 | 파일 | 역할 |
|------|------|------|
| 네비게이션 토글 | script.js | 모바일 햄버거 메뉴 열기/닫기 |
| 부드러운 스크롤 | script.js | 앵커 링크 클릭 시 부드러운 이동 |
| 메뉴 활성화 | script.js | 스크롤 위치에 따른 네비게이션 강조 |
| 스크롤 애니메이션 | script.js | Intersection Observer로 요소 나타나기 효과 |
| 폼 검증 | script.js | 연락처 폼 입력값 검증 |

### 반응형 디자인 브레이크포인트

- **Mobile**: < 640px (기본 모바일 레이아웃)
- **Tablet**: 640px - 1024px (중간 크기 조정)
- **Desktop**: > 1024px (전체 풀 레이아웃)

## 개발 가이드

### 이력서 콘텐츠 수정

1. `index.html`의 해당 섹션 찾기
2. 텍스트 콘텐츠 변경
3. 필요하면 `css/style.css`에서 스타일 조정

### 새로운 기능 추가

1. 필요한 HTML 마크업 `index.html`에 추가
2. `css/style.css`에 스타일 작성
3. 필요하면 `js/script.js`에 인터랙션 로직 추가

### 이미지 및 자산 추가

- 이미지: `assets/images/` 폴더에 저장
- PDF, 문서: `assets/files/` 폴더에 저장
- 리소스 경로: 상대 경로 사용 (예: `assets/images/profile.jpg`)

## 배포 준비

### GitHub Pages
```bash
# 저장소 설정 > Pages > Deploy from branch > main 선택
```

### Netlify
```bash
# 저장소 연결 후 자동 배포
```

## 성능 및 품질 체크리스트

- [ ] Lighthouse 점수 90 이상
- [ ] 모든 이미지 최적화 (WebP 포맷 고려)
- [ ] 크로스 브라우저 호환성 확인
- [ ] 모바일/태블릿/데스크톱 반응형 테스트
- [ ] WCAG 2.1 접근성 기준 준수
- [ ] SEO 메타데이터 완성 (og:image 등)

## 주요 의존성 (향후 추가 가능)

- TailwindCSS: 유틸리티 기반 CSS 프레임워크
- Intersection Observer API: 스크롤 기반 애니메이션
- Fetch API: 폼 제출 (선택사항)

현재는 외부 라이브러리 최소화 원칙 (바닐라 JavaScript + TailwindCSS CDN)

## 유용한 참고 자료

- [ROADMAP.md](./ROADMAP.md): 프로젝트 개발 단계별 계획
- [TailwindCSS 문서](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)
