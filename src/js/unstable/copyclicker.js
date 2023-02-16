import { copyToClipboard } from "../utils/helpers.js";

// const copyNotificationText = "Скопировано";
/*
  Добавь класс js_copyclicker

 */

const copyClickItems = document.querySelectorAll(".js_copyclicker");
copyClickItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // код для мобильных устройств
    } else {
      // код для обычных устройств
      e.preventDefault();
      let copyNotificationText = item.dataset.copyText;
      if (copyNotificationText === undefined) {
        copyNotificationText = "✓";
      }
      
      if (item.innerText.includes(copyNotificationText)) return;


      const copiedText = item.innerText;
      copyToClipboard(copiedText);
      item.dataset.text = copiedText;
      if (item.querySelector(".link__text")) {
        const telText = item.querySelector(".link__text");
        telText.innerText = copyNotificationText;
        setTimeout(() => {
          telText.innerText = item.dataset.text;
        }, 5000);
      } else {
        item.innerText = copyNotificationText;
        setTimeout(() => {
          item.innerText = item.dataset.text;
        }, 5000);
      }
    }
  });
});
