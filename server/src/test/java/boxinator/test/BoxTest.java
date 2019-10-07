package boxinator.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import boxinator.helpers.BoxHelper;
import boxinator.models.BoxModel;

public class BoxTest {

	@Test
    public void BoxHelperShouldValidateThatColorCanNotBeBlue() {
		assertFalse("#00ff1a is expected to be a valid color but isBlue method returned true", BoxHelper.isBlue("#00ff1a"));
		assertFalse("00fffe should be on the green edge of turkoise but isBlue method return true", BoxHelper.isBlue("#00fffe"));
		assertTrue("00ffff should be on the actual edge of turkoise but isBlue method return false", BoxHelper.isBlue("#00ffff"));
		assertTrue("#00feff should be on the blue edge of turkoise and return false", BoxHelper.isBlue("#00feff"));
		assertTrue("#0000ff is in the blue area but isBlue method return false", BoxHelper.isBlue("#0000ff"));
		assertTrue("#7e00ff should be on the blue edge of purple but isBlue method return false", BoxHelper.isBlue("#7e00ff"));
		assertTrue("#7f00ff should be on the actual edge of purple but isBlue method return false", BoxHelper.isBlue("#7f00ff"));
		assertFalse("#8000ff should be on the red edge of purple ut isBlue method return true", BoxHelper.isBlue("#8000ff"));
		assertFalse("#ffeeee should be in the red area ut isBlue method return true", BoxHelper.isBlue("#ffeeee"));
	}
	
	@Test
    public void BoxModelShouldValidateColorCorrectly() {
		
		BoxModel box = new BoxModel();
		
		box.setColor("#00ff1a");
		assertFalse("#00ff1a is expected to be a valid color but isBlue method returned true", box.validate().contains("C"));
		
		box.setColor("#00fffe");
		assertFalse("00fffe should be on the green edge of turkoise but isBlue method return true", box.validate().contains("C"));
		
		box.setColor("00ffff");
		assertTrue("00ffff should be on the actual edge of turkoise but isBlue method return false", box.validate().contains("C"));
		
		box.setColor("#00feff");
		assertTrue("#00feff should be on the blue edge of turkoise and return false", box.validate().contains("C"));
		
		box.setColor("#0000ff");
		assertTrue("#0000ff is in the blue area but isBlue method return false", box.validate().contains("C"));
		
		box.setColor("#7e00ff");
		assertTrue("#7e00ff should be on the blue edge of purple but isBlue method return false", box.validate().contains("C"));
		
		box.setColor("#7f00ff");
		assertTrue("#7f00ff should be on the actual edge of purple but isBlue method return false", box.validate().contains("C"));
		
		box.setColor("#8000ff");
		assertFalse("#8000ff should be on the red edge of purple ut isBlue method return true", box.validate().contains("C"));
		
		box.setColor("#ffeeee");
		assertFalse("#ffeeee should be in the red area ut isBlue method return true", box.validate().contains("C"));
	}
	
	@Test
    public void BoxHelperShouldValidateColorCorrectly() {	
		
		assertFalse("Color string must have the format #RRGGBB in hex", BoxHelper.IsValidColorString(""));  
        assertFalse("Color string must have the format #RRGGBB in hex", BoxHelper.IsValidColorString("#FFFFFFC")); 
        assertFalse("Color string must have the format #RRGGBB in hex", BoxHelper.IsValidColorString("FFFFFF"));
        assertFalse("Color string must have the format #RRGGBB in hex", BoxHelper.IsValidColorString("#678FFF")); 
        
		assertFalse("#00ff1a is expected to be a valid color but isBlue method returned true", BoxHelper.Validate("", 0, "#00ff1a", "").contains("C"));
		assertFalse("#00fffe should be on the green edge of turkoise but isBlue method return true", BoxHelper.Validate("", 0, "#00fffe", "").contains("C"));
		assertTrue("#00ffff should be on the actual edge of turkoise but isBlue method return false", BoxHelper.Validate("", 0, "#00ffff", "").contains("C"));
		assertTrue("#00feff should be on the blue edge of turkoise and return false", BoxHelper.Validate("", 0, "#00feff", "").contains("C"));
		assertTrue("#0000ff is in the blue area but isBlue method return false", BoxHelper.Validate("", 0, "#0000ff", "").contains("C"));
		assertTrue("#7e00ff should be on the blue edge of purple but isBlue method return false", BoxHelper.Validate("", 0, "#7e00ff", "").contains("C"));
		assertTrue("#7f00ff should be on the actual edge of purple but isBlue method return false", BoxHelper.Validate("", 0, "#7f00ff", "").contains("C"));
		assertFalse("#8000ff should be on the red edge of purple ut isBlue method return true", BoxHelper.Validate("", 0, "#8000ff", "").contains("C"));
		assertFalse("#ffeeee should be in the red area ut isBlue method return true", BoxHelper.Validate("", 0, "#ffeeee", "").contains("C"));
	}	

	@Test
    public void BoxHelperShouldValidateWeightCorrectly() {	
		assertFalse("Weight must be > 0", BoxHelper.IsValidWeight(-1));
		assertFalse("Weight must be < 20001", BoxHelper.IsValidWeight(20001));
		assertTrue("Weight should be allowed between 0 and 20001", BoxHelper.IsValidWeight(1000));
		
		assertTrue("Weight must be > 0", BoxHelper.Validate("", -1, "", "").contains("W"));
		assertTrue("Weight must be < 20001", BoxHelper.Validate("", 20001, "", "").contains("W"));
		assertFalse("Weight should be allowed between 0 and 20001", BoxHelper.Validate("", 1000, "", "").contains("W"));
	}
	
	@Test
    public void BoxHelperShouldValidateNameCorrectly() {	
		assertFalse("Name can not be an empty string", BoxHelper.IsValidName(""));
		assertFalse("Name can not contain more than 100 characters", BoxHelper.IsValidName("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultrices lorem quis auctor. to long"));
		assertTrue("Name should be allowed to contain 100 characters", BoxHelper.IsValidName("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultrices lorem quis auctor. a"));
		
		assertTrue("Name can not be an empty string", BoxHelper.Validate("", 0, "", "").contains("N"));
		assertTrue("Name can not contain more than 100 characters", BoxHelper.Validate("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultrices lorem quis auctor. to long", 0, "", "").contains("N"));
		assertFalse("Name should be allowed to contain 100 characters", BoxHelper.Validate("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultrices lorem quis auctor. a", 0, "", "").contains("N"));
	}
	
	@Test
    public void BoxHelperShouldValidateCountryCodeCorrectly() {	
		assertFalse("CountryCode can not be an empty string", BoxHelper.IsValidCountryCode(""));
		assertFalse("CountryCode must contain 2 characters", BoxHelper.IsValidCountryCode("SEE"));
		assertTrue("CountryCode should be allowed to contain exactly 2 characters", BoxHelper.IsValidCountryCode("SE"));
		
		assertTrue("CountryCode can not be an empty string", BoxHelper.Validate("", 0, "", "").contains("D"));
		assertTrue("CountryCode must contain 2 characters", BoxHelper.Validate("", 0, "", "SEE").contains("D"));
		assertFalse("CountryCode should be allowed to contain exactly 2 characters", BoxHelper.Validate("", 0, "", "SE").contains("D"));
	}
}
