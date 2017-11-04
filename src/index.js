const APP_PREFIX = 'data-d0x';
const DEFAULT_PROPS = {
  value: 1,
  title: 'Donate'
};

function getD0xElements() {
  return document.querySelectorAll('[' + APP_PREFIX + ']');
}

function parseProperties(el) {
  const props = {};
  for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
    const attr = atts[i];
    if(attr.name.indexOf(APP_PREFIX + '-') !== -1) {
      props[attr.name.split(APP_PREFIX + '-')[1]] = attr.value;
    }
  }
  if(!props.address) {
    throw new Error('[Donate0x]: data-d0x-address attribute is required');
  }
  return Object.assign({}, DEFAULT_PROPS, props);
}

function clickHandler(props) {
  console.log(props);
  web3.eth.sendTransaction({
    to: props.address,
    value: web3.toWei(props.value, 'ether')
  }, (err, tx) => {
    console.log(tx);
  });
}

function renderDonateButton(el) {
  const props = parseProperties(el);
  const button = document.createElement('button');
  button.innerText = props.title;
  button.onclick = clickHandler.bind(null, props);
  el.appendChild(button);
}

function setup() {
  const elements = getD0xElements();
  elements.forEach(renderDonateButton);
}

setup();