const outputDiv = document.getElementById('output');
const input = document.getElementById('cmd');
const mainMenu = `Welcome to ESP32 Multitool
1) Auto Login
2) Deauth Nearby Wi-Fi
3) Fake Blue Screen
Type a number to view more details.`;
let optionSelected = false;

function updateOutput(text) {
  text.split('\n').forEach(line => {
    const div = document.createElement('div');
    div.textContent = line; // no innerHTML
    outputDiv.appendChild(div);
  });
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

input.addEventListener('keydown', function(event) {
  // Ctrl+L to clear the screen
  if (event.ctrlKey && event.key === 'l') {
    event.preventDefault(); // prevent browser from clearing page

    // Clear output and reprint menu
    outputDiv.innerText = ''; // or use .replaceChildren() if you're avoiding innerHTML
    updateOutput(mainMenu);
    updateOutput('')
    return;
  }

  if (event.key === 'Enter') {
    const cmd = input.value.trim();
    input.value = '';

    updateOutput(`[root@esp32multitool ~]$ ${cmd}`);

    if (cmd === '') {
      updateOutput('');
      return;
    }

    let newText = '';
    switch (cmd) {
      case '1':
        newText = 'Running Auto Login script...\nLogging you in...';
        optionSelected = true;
        break;
      case '2':
        newText = 'Starting Wi-Fi Deauth attack...\n(For testing on your own devices only!)';
        optionSelected = true;
        break;
      case '3':
        newText = 'Activating Fake Blue Screen...\nJust kidding, it\'s a prank!';
        optionSelected = true;
        break;
      case 'cd':
        if (optionSelected) {
          outputDiv.innerText = '';
          updateOutput('\n' + mainMenu);
          optionSelected = false;
          return;
        } else {
          newText = 'No previous menu to go back to.';
        }
        break;
      default:
        newText = `Command not recognized: ${cmd}`;
    }

    updateOutput(newText);
  }
});
