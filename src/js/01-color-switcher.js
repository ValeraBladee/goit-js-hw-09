
import { onStartBtnClick, onStopBtnClick } from './handlers';
import { refs } from './refs';

refs.stopBtn.disabled = true; 
      
refs.startBtn.addEventListener('click', onStartBtnClick )


refs.stopBtn.addEventListener('click', onStopBtnClick)





