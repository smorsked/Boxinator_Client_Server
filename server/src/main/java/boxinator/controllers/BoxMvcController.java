package boxinator.controllers;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import boxinator.entities.Box;
import boxinator.models.BoxModel;
import boxinator.services.IBoxService;
import boxinator.services.IDestinationService;

@Controller
@RequestMapping("/boxes")
public class BoxMvcController {

	private static final Logger LOG = Logger.getLogger(BoxMvcController.class);
	
	@Autowired
	private IBoxService boxService;
	
	@Autowired
	private IDestinationService destinationService;
		
	@GetMapping("/add")
	public String form(Model model) {
		
		model.addAttribute("box", new BoxModel());
		model.addAttribute("destinations", destinationService.find());
		
		return "box-form";
	}
	
	@GetMapping("/edit")
	public String newBox(@RequestParam("id") int id, Model model) {					
		
		try
		{
			BoxModel box = new BoxModel();
			Box tempBox = boxService.find(id);
			
			box.setId(tempBox.getId());
			box.setName(tempBox.getName());
			box.setColor(tempBox.getColor());
			box.setWeight(tempBox.getWeight());
			box.setCountryCode(tempBox.getDestination().getCountryCode());
			
			model.addAttribute("box", box);
			LOG.info("Box added to model: " + box.toString());
			
			model.addAttribute("destinations", destinationService.find());		
			
		} catch (Exception e) {			
			LOG.error(e);
			return "error-generic";
		}
		
		return "box-form";
	}
	
	@GetMapping("/list")
	public String list(Model model) {
		List<Box> boxes = boxService.find();
		model.addAttribute("boxes", boxes);
		return "list-boxes";
	}
	
	@PostMapping("/save")
	public String add(@ModelAttribute("BoxRestModel") BoxModel model) {	
	
		try
		{
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
			LOG.info("Box added: " + box.toString());
			
		} catch (Exception e) {			
			LOG.error(e);
			return "error-generic";
		}
		
		return "redirect:/boxes/list";		
	}	
	
	@GetMapping("/delete")
	public String delete(@RequestParam("id") int id) {
		boxService.delete(id);
		return "redirect:/boxes/list";
	}
}
