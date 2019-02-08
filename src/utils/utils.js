export function senSplit(word) {
  let a = word.sen.map((value, index, arr) => {
    let reg = new RegExp(word.w, 'i', 'g')
    return value.e.replace(reg, '<em>' + word.w + '</em>')
  })
  return a
}

// 函数防抖
export function debounce(fn, delay = 300) {
  let timer
  return function () {
    let th = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  };
}

export function wordVoice(word) {
  let prevFrame = document.getElementById('customAudio')
  let iframe = null
  let timer = null
  clearTimeout(timer)
  if (prevFrame) {
    iframe = prevFrame.cloneNode(true)
    prevFrame.parentNode.removeChild(prevFrame)
    prevFrame = null
  } else {
    iframe = document.createElement('iframe')
    iframe.src = 'http://dict.youdao.com/dictvoice?audio=' + word
    iframe.id = 'customAudio'
    iframe.style.display = 'none'
    iframe.setAttribute('data-custom', true)
  }
  timer = setTimeout(function() {
    iframe.remove()
  }, 3000)
  document.body.appendChild(iframe)
}