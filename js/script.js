/**
 * 개발자 웹 이력서 - 메인 스크립트
 * 설명: 네비게이션, 스크롤 애니메이션, 폼 검증 등 인터랙션 처리
 */

// ============================================================
// DOM 로드 완료 후 초기화 실행
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// ============================================================
// 전역 상태 및 DOM 참조
// ============================================================

/** @type {HTMLElement} 헤더 요소 */
const header = document.getElementById('header');

/** @type {HTMLElement} 햄버거 버튼 */
const hamburgerBtn = document.getElementById('hamburger-btn');

/** @type {HTMLElement} 모바일 메뉴 */
const mobileMenu = document.getElementById('mobile-menu');

/** @type {NodeList} 모든 네비게이션 링크 */
const navLinks = document.querySelectorAll('.nav-link');

/** @type {NodeList} 스크롤 애니메이션 대상 요소들 */
const fadeElements = document.querySelectorAll('.fade-in-element');

/** @type {HTMLElement} 스크롤 맨위 버튼 */
const scrollTopBtn = document.getElementById('scroll-top-btn');

/** @type {HTMLFormElement} 연락처 폼 */
const contactForm = document.getElementById('contact-form');

/** @type {boolean} 모바일 메뉴 열림 상태 */
let isMenuOpen = false;

// ============================================================
// 햄버거 메뉴 토글 기능
// ============================================================

/**
 * 모바일 햄버거 메뉴를 토글합니다.
 * aria-expanded 속성을 업데이트하여 접근성을 보장합니다.
 */
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;

  // 클래스 토글로 CSS 슬라이드 애니메이션 트리거
  mobileMenu.classList.toggle('open', isMenuOpen);

  // 접근성 속성 업데이트
  hamburgerBtn.setAttribute('aria-expanded', String(isMenuOpen));
}

/**
 * 모바일 메뉴를 닫습니다.
 */
function closeMobileMenu() {
  if (!isMenuOpen) return;
  isMenuOpen = false;
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

// 이벤트: 햄버거 버튼 클릭
hamburgerBtn.addEventListener('click', toggleMobileMenu);

// 이벤트: 모바일 메뉴 링크 클릭 시 메뉴 닫기 (이벤트 위임)
mobileMenu.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeMobileMenu();
  }
});

// 이벤트: 메뉴 외부 클릭 시 닫기
document.addEventListener('click', (event) => {
  const isClickInside = header.contains(event.target);
  if (!isClickInside && isMenuOpen) {
    closeMobileMenu();
  }
});

// 이벤트: ESC 키로 메뉴 닫기 (접근성)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen) {
    closeMobileMenu();
    hamburgerBtn.focus(); // 포커스 복귀
  }
});

// ============================================================
// 스크롤 기반 헤더 스타일 및 스크롤 톱 버튼
// ============================================================

/**
 * 스크롤 위치에 따라 헤더 스타일과 스크롤 버튼 가시성을 업데이트합니다.
 * requestAnimationFrame을 사용하여 성능을 최적화합니다.
 */
function handleScroll() {
  const scrollY = window.scrollY;

  // 헤더: 스크롤 시 그림자 효과 추가
  if (scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // 스크롤 맨위 버튼: 300px 이상 스크롤 시 표시
  if (scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  // 활성 섹션 감지
  updateActiveNavLink();
}

/** @type {boolean} rAF 스로틀 플래그 */
let isScrollThrottled = false;

// 스크롤 이벤트에 requestAnimationFrame 적용 (성능 최적화)
window.addEventListener('scroll', () => {
  if (!isScrollThrottled) {
    isScrollThrottled = true;
    requestAnimationFrame(() => {
      handleScroll();
      isScrollThrottled = false;
    });
  }
});

// 스크롤 맨위 버튼 클릭 이벤트
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 활성 네비게이션 링크 강조
// ============================================================

/**
 * 현재 뷰포트에서 보이는 섹션을 판단하여
 * 해당 네비게이션 링크에 active 클래스를 추가합니다.
 */
function updateActiveNavLink() {
  // 모든 섹션의 위치 정보 수집
  const sections = document.querySelectorAll('main section[id]');
  const headerHeight = header.offsetHeight;
  const scrollMidpoint = window.scrollY + headerHeight + 100;

  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollMidpoint >= sectionTop && scrollMidpoint < sectionBottom) {
      currentSectionId = section.id;
    }
  });

  // 모든 nav 링크에서 active 제거 후 현재 섹션 링크에 active 추가
  navLinks.forEach((link) => {
    link.classList.remove('active');
    // href="#profile" → "profile" 추출
    const linkTarget = link.getAttribute('href')?.substring(1);
    if (linkTarget === currentSectionId) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// Intersection Observer 스크롤 애니메이션
// ============================================================

/**
 * Intersection Observer를 사용하여 스크롤 등장 애니메이션을 초기화합니다.
 * 요소가 뷰포트에 진입하면 .visible 클래스를 추가합니다.
 */
function initScrollAnimations() {
  // Observer 설정
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트 진입 시 visible 클래스 추가
        entry.target.classList.add('visible');
        // 한 번 등장하면 더 이상 관찰 불필요 (성능 최적화)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 모든 fade-in-element 요소 관찰 시작
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// ============================================================
// 폼 유효성 검사 관련 함수
// ============================================================

/**
 * 개별 폼 필드의 유효성을 검사하고 에러 메시지를 표시합니다.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - 검사할 필드 요소
 * @returns {boolean} 유효하면 true, 아니면 false
 */
function validateField(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  const value = field.value.trim();
  let errorMessage = '';

  // 필수 값 검사
  if (field.required && value === '') {
    errorMessage = '이 항목은 필수입니다.';
  }
  // 이메일 형식 검사
  else if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = '올바른 이메일 형식을 입력해주세요.';
    }
  }
  // 최소 길이 검사 (메시지 필드)
  else if (field.id === 'message' && value.length < 10) {
    errorMessage = '메시지는 최소 10자 이상 입력해주세요.';
  }

  if (errorMessage) {
    // 에러 상태 표시
    field.classList.add('error');
    field.classList.remove('success');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.remove('hidden');
    }
    return false;
  } else {
    // 성공 상태 표시
    field.classList.remove('error');
    field.classList.add('success');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
    }
    return true;
  }
}

/**
 * 폼 전체의 유효성을 검사합니다.
 * @returns {boolean} 모든 필드가 유효하면 true
 */
function validateForm() {
  const fields = contactForm.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * 폼 제출 성공 후 UI를 초기화하고 성공 메시지를 표시합니다.
 */
function showFormSuccess() {
  // 성공 메시지 요소 표시
  const successMessage = document.getElementById('form-success');
  if (successMessage) {
    successMessage.classList.remove('hidden');
    // 3초 후 숨김
    setTimeout(() => successMessage.classList.add('hidden'), 3000);
  }
  // 폼 초기화
  contactForm.reset();
  // 모든 필드의 성공/에러 클래스 제거
  contactForm.querySelectorAll('.form-input').forEach((input) => {
    input.classList.remove('error', 'success');
  });
}

// 이벤트: 폼 제출
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    // 첫 번째 에러 필드로 포커스 이동
    const firstError = contactForm.querySelector('.form-input.error');
    if (firstError) firstError.focus();
    return;
  }

  // 제출 버튼 로딩 상태
  const submitBtn = contactForm.querySelector('[type="submit"]');
  submitBtn.classList.add('loading');

  // 1.5초 딜레이 후 성공 처리 (목업)
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    showFormSuccess();
  }, 1500);
});

// 이벤트: 실시간 유효성 검사 (blur 이벤트 - 포커스 이탈 시)
contactForm.querySelectorAll('.form-input').forEach((field) => {
  field.addEventListener('blur', () => validateField(field));
  // input 이벤트로 에러 즉시 제거 (사용자 경험 개선)
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      validateField(field);
    }
  });
});

// ============================================================
// 부드러운 스크롤 초기화
// ============================================================

/**
 * 앵커 링크의 부드러운 스크롤을 초기화합니다.
 * CSS scroll-padding-top이 올바르게 적용되면 이 함수는 단순화됩니다.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      // CSS scroll-padding-top이 처리하지 못하는 경우 JS fallback
      const headerOffset = header.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================================
// 페이지 초기화 - DOMContentLoaded에서 호출
// ============================================================

/**
 * 페이지 초기화 - DOMContentLoaded에서 호출됩니다.
 * 모든 기능의 진입점입니다.
 */
function init() {
  // 스크롤 애니메이션 초기화
  initScrollAnimations();

  // 부드러운 스크롤 초기화
  initSmoothScroll();

  // 초기 스크롤 상태 반영 (페이지 새로고침 시 스크롤 위치 보존)
  handleScroll();
}
