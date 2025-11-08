import './style.css'

const menuToggle = document.querySelector('.menu-toggle')
const navMenu = document.querySelector('.nav-menu')

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')

    const spans = menuToggle.querySelectorAll('span')
    spans.forEach((span, index) => {
      if (navMenu.classList.contains('active')) {
        if (index === 0) span.style.transform = 'rotate(45deg) translateY(9px)'
        if (index === 1) span.style.opacity = '0'
        if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-9px)'
      } else {
        span.style.transform = 'none'
        span.style.opacity = '1'
      }
    })
  })

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      const spans = menuToggle.querySelectorAll('span')
      spans.forEach(span => {
        span.style.transform = 'none'
        span.style.opacity = '1'
      })
    })
  })
}

const contactForm = document.getElementById('contactForm')

if (contactForm) {
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const messageInput = document.getElementById('message')

  const nameError = document.getElementById('nameError')
  const emailError = document.getElementById('emailError')
  const messageError = document.getElementById('messageError')

  const successMessage = document.getElementById('successMessage')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const showError = (input, errorElement, message) => {
    input.classList.add('error')
    errorElement.textContent = message
    errorElement.classList.add('visible')
  }

  const clearError = (input, errorElement) => {
    input.classList.remove('error')
    errorElement.textContent = ''
    errorElement.classList.remove('visible')
  }

  const validateField = (input, errorElement, validationFn, errorMessage) => {
    if (!validationFn(input.value.trim())) {
      showError(input, errorElement, errorMessage)
      return false
    } else {
      clearError(input, errorElement)
      return true
    }
  }

  nameInput.addEventListener('blur', () => {
    validateField(
      nameInput,
      nameError,
      (value) => value !== '',
      'Le nom est obligatoire'
    )
  })

  emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim()
    if (value === '') {
      showError(emailInput, emailError, "L'email est obligatoire")
    } else if (!validateEmail(value)) {
      showError(emailInput, emailError, "L'email n'est pas valide")
    } else {
      clearError(emailInput, emailError)
    }
  })

  messageInput.addEventListener('blur', () => {
    validateField(
      messageInput,
      messageError,
      (value) => value !== '',
      'Le message est obligatoire'
    )
  })

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    successMessage.classList.remove('visible')

    const isNameValid = validateField(
      nameInput,
      nameError,
      (value) => value !== '',
      'Le nom est obligatoire'
    )

    const emailValue = emailInput.value.trim()
    let isEmailValid = false
    if (emailValue === '') {
      showError(emailInput, emailError, "L'email est obligatoire")
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, emailError, "L'email n'est pas valide")
    } else {
      clearError(emailInput, emailError)
      isEmailValid = true
    }

    const isMessageValid = validateField(
      messageInput,
      messageError,
      (value) => value !== '',
      'Le message est obligatoire'
    )

    if (isNameValid && isEmailValid && isMessageValid) {
      successMessage.classList.add('visible')

      setTimeout(() => {
        contactForm.reset()
        successMessage.classList.remove('visible')
      }, 5000)
    }
  })
}
