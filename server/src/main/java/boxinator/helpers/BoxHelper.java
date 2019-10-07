package boxinator.helpers;

public class BoxHelper {
	
	public static String Validate(String name, float weight, String color, String countryCode) {
		String status = "";

		if (!IsValidName(name)) {
			status += "N";
		}
		if (!IsValidWeight(weight)) {
			status += "W";
		}
		if (!IsValidColorString(color)) {
			status += "C";
		}
		if (!IsValidCountryCode(countryCode)) {
			status += "D";
		}
		return status;
	}
	
	// example for valid name:#not empty #less than 100 characters
	public static boolean IsValidName(String name) {
		if (name != null) {
			if (name.length() > 0 && name.length() < 100) {
				return true;
			}
		}
		return false;
	}

	// example for valid weight:#non-zero #less than 20000
	public static boolean IsValidWeight(float weight) {
		if (weight > 0 && weight < 20001) {
			return true;
		}
		return false;
	}

	// returns true if the specified color is a valid color and if the specified
	// color is not blue (all colors except for blue hues)
	public static boolean IsValidColorString(String color) {		
		String hexTemplate = "0123456789abcdefABCDEF";
		if (color != null && color.length() == 7) {
			if (color.charAt(0) == '#') {
				for (int i = 1; i < color.length(); i++) {
					if (!hexTemplate.contains("" + color.charAt(i))) {
						return false;
					}
				}
				if (isBlue(color)) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}
	
	// returns true if the countrycode of the received box is a part of the set of
	// countrycodes stored on the database
	public static boolean IsValidCountryCode(String countryCode) {
		if (countryCode == null) {
			return false;
		}
		
		if (countryCode.length() != 2) {
			return false;
		}
		
		return true;
	}		
	
	// return true if blue is more than 2x of red and green is less than
	// blue(from turkoise to purple) = blue = false
	public static boolean isBlue(String color) {		
		if (color != null && color.length() == 7) {
			color = color.toLowerCase();
			int R = Integer.parseInt("" + color.charAt(1) + color.charAt(2), 16);
			int G = Integer.parseInt("" + color.charAt(3) + color.charAt(4), 16);
			int B = Integer.parseInt("" + color.charAt(5) + color.charAt(6), 16);

			int min = Math.min(R, Math.min(G, B));

			R = R - min;
			G = G - min;
			B = B - min;

			if (G <= B && (float) R < ((float) B / 2)) {
				return true;
			}
		}
		
		return false;
	}
}
