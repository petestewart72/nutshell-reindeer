import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

import './dinoCards.scss';

const updateDinoHandlers = (e) => {
  utils.clearModal();
  const staffId = e.target;
  console.warn(staffId);
};

const runDinoModal = () => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      let domString = `
        <div class="modal check-dino-modal" id="check-dino-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="check-dino-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="check-dino-label"><i class="fas fa-exclamation-triangle pr-2"></i> Dinos need more handlers!</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" id="close-dino-modal">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="dinos">
      `;
      dinos.forEach((dino) => {
        if (dino.assignees.length <= 1) {
          domString += `
          <div class="btn-group pl-3 dino-name" id="test" role="group" aria-label="Button group with nested dropdown">
            <button type="text" class="btn btn-secondary">${dino.name}</button>
            <div class="btn-group" role="group">
              <select name="update-dino-handler" id="update-dino-handler">
                <option value="dinosaurs">Dinosaurs</option>
                <option value="rides">Rides</option>
                <option value="vendors">Vendors</option>
              </select>
            </div>
          </div>
          `;
        }
      });
      domString += `
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-handler-updates">Save</button>
              </div>
            </div>
          </div>
        </div>
      `;
      utils.printToDom('#check-dino', domString);
      $('#check-dino-modal').modal('show');
      $('body').on('click', '#close-dino-modal', utils.clearModal);
      $('body').on('click', '#save-handler-updates', updateDinoHandlers);
    })
    .catch((err) => console.error('Getting handlers for dinos did not work -> ', err));
};

const checkDinoHandlers = () => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      dinos.forEach((dino) => {
        if (dino.assignees.length <= 1) {
          runDinoModal();
        }
      });
    })
    .catch((err) => console.error('Getting handlers for dino modal did not work -> ', err));
};

export default { checkDinoHandlers };