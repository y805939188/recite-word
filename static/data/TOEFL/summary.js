var title = window.location.hash
var count = 0
switch (title) {
  case '托福词汇':
    count = 9322
    break
  case 'GRE词汇':
    count = 7318
    break
  case '专八词汇':
    count = 12613
    break
  case '专四词汇':
    count = 8594
    break
  case '六级词汇':
    count = 2087
    break
  case '四级词汇':
    count = 3750
    break
  case '考研词汇':
    count = 5218
    break
  case '雅思核心词汇':
    count = 3432
    break
  case '高考必背词汇':
    count = 3826
    break
}
var summary = 
{"numTotal":`${count}`,"numPerList":50,"bookName":`${title}`,"numPerFile":400,"firstLoad":30,"nextLoad":15};