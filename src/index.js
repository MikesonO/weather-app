import eventEmitter from './modules/events/eventEmitter';
import weatherApi from './modules/functions/weatherApi';
import './styles/styles.scss';

// Font Awesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

eventEmitter();
weatherApi();