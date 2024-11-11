import { addTweetAction, addResponse } from '../store/actions'; 
import { addObserver, appState, dispatch } from '../store';
import { getState } from '../store/index'; 
import { Screens } from '../types/store';
import { TweetData } from '../types/tweets';

class Dashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initialize();
  }

  initialize() {
    addObserver(this.update.bind(this));  // Agregar observador para los cambios en el estado
  }

  update() {
    const state = getState();
    // Aquí puedes usar el estado para actualizar la UI según lo necesites
    console.log('Current State:', state);
    // Actualiza la UI, por ejemplo, renderizando tweets u otros datos del estado
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        /* Tus estilos aquí */
      </style>
      <div>
        <center-section></center-section>
        <!-- Agrega otras secciones si es necesario -->
      </div>
    `;

    // Añadir el Event Listener para 'addTweet'
    const centerSection = this.shadowRoot!.querySelector('center-section');
    if (centerSection) {
      centerSection.addEventListener('addTweet', (e: Event) => {
        const customEvent = e as CustomEvent<{ text: string; imageUrl: string; }>;
        this.handleAddTweet(customEvent.detail);
      });
    }
  }

  handleAddTweet(tweetContent: { text: string; imageUrl: string; }) {   
    const tweet: TweetData = {
      id: 'some-unique-id',  // Puedes generar un ID único, por ejemplo usando un timestamp o algún otro método
      text: tweetContent.text,
      imageUrl: tweetContent.imageUrl,
      userUid: appState.user?.uid || '',  // Asegúrate de usar el UID correcto
      createdAt: new Date(),  // Usamos la fecha actual
      avatarUrl: null,
      username: appState.user?.name || '',
    };
  
    // Despachar la acción para agregar el tweet al estado
    dispatch(addTweetAction(tweet));
  
    // Actualiza la UI si es necesario
    this.update();
  }

}

customElements.define('dashboard-screen', Dashboard);
