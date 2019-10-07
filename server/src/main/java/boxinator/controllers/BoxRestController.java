package boxinator.controllers;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import boxinator.entities.Box;
import boxinator.entities.Destination;
import boxinator.models.BaseResponseModel;
import boxinator.models.BoxModel;
import boxinator.models.ListModel;
import boxinator.services.IBoxService;
import boxinator.services.IDestinationService;

@RestController
@RequestMapping("/api/box")
public class BoxRestController {

	private static final Logger LOG = Logger.getLogger(BoxRestController.class);

	@Autowired
	private IBoxService boxService;

	@Autowired
	private IDestinationService destinationService;

	private static final String SUCCESS_STATUS = "success";
	private static final String ERROR_STATUS = "error";
	private static final int CODE_SUCCESS = 200;
	private static final int AUTH_FAILURE = 500;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public BaseResponseModel addBox(@RequestBody BoxModel model) {
		BaseResponseModel response = new BaseResponseModel();
	
		String validationStatus = model.validate(); // validate box gives am error code which signals any faulty
													// inputs in the box

		if (validationStatus.length() > 0) {
			response.setStatus(validationStatus);
			response.setCode(415);
			return response;
		}
		try {
			Box box;

			if (model.getId() > 0) {
				box = boxService.find(model.getId());
				box.setName(model.getName());
				box.setWeight(model.getWeight());
				box.setColor(model.getColor());
			} else {
				box = new Box();
				box.setName(model.getName());
				box.setColor(model.getColor());
				box.setWeight(model.getWeight());
			}

			if (model.getCountryCode() != null && !model.getCountryCode().isEmpty()) {
				box.setDestination(destinationService.find(model.getCountryCode()));
			}

			boxService.save(box); 

			response.setStatus(SUCCESS_STATUS);
			response.setCode(CODE_SUCCESS);
		} catch (Exception e) {

			LOG.error(e);

			response.setStatus(ERROR_STATUS);
			response.setCode(AUTH_FAILURE);
		}
		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ListModel listBoxes() {
		ListModel model = new ListModel();

		model.setBoxes(boxService.find());

		model.setTotalWeight(model.getBoxes().stream().mapToDouble(Box::getWeight).sum());

		model.setTotalPrice(model.getBoxes().stream().mapToDouble(Box::getPrice).sum());

		return model;
	}

	@RequestMapping(value = "/destinations", method = RequestMethod.GET)
	public List<Destination> listDestinations() {
		return destinationService.find();
	}

	@RequestMapping(value = "/debug", method = RequestMethod.GET)
	public BaseResponseModel debug() {
		BaseResponseModel response = new BaseResponseModel();
		response.setStatus(SUCCESS_STATUS);
		response.setCode(CODE_SUCCESS);
		return response;
	}
}
