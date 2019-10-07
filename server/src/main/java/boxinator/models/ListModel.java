package boxinator.models;

import java.util.List;

import boxinator.entities.Box;

public class ListModel {

	private double totalWeight;
	private double totalPrice;
	private List<Box> boxes;
	
	public double getTotalWeight() {
		return this.totalWeight;
	}

	public void setTotalWeight(double totalWeight) {
		this.totalWeight = totalWeight;
	}
	
	public double getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public List<Box> getBoxes() {
		return this.boxes;
	}

	public void setBoxes(List<Box> boxes) {
		this.boxes = boxes;
	}
}
