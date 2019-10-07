package boxinator.models;

import boxinator.helpers.BoxHelper;

public class BoxModel {
	
	private int id;

	private String name;

	private float weight;

	private String color;

	private String countryCode;

	public BoxModel() {
	}

	public int getId() {				
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getWeight() {
		return this.weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCountryCode() {
		return this.countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	// validates the values of the received box and returns an error message of any
	// are faulty
	public String validate() {
		return BoxHelper.Validate(this.name, this.weight, this.color, this.countryCode);
	}	

	@Override
	public String toString() {
		return "Box [id=" + id + ", Name=" + name + ", Color=" + color.toString() + ", Weight=" + weight
				+ ", countryCode=" + countryCode + "]";
	}
}