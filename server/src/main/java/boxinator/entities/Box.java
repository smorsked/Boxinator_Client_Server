package boxinator.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Box")
public class Box {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Weight")
	private float weight;
	
	@Column(name="Color")
	private String color;
	
	@ManyToOne
    @JoinColumn(name = "CountryCode")	
	private Destination destination;
	
	public Box() { }
	
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
	
	public float getPrice() {
		if (this.destination != null && this.weight > 0) {
			return this.destination.getPriceMultiplier() * this.weight;
		}
		return 0;
	}
		
    public Destination getDestination() {
        return this.destination;
    }
	
	public void setDestination(Destination destination) {
		this.destination = destination;
	}

	@Override
	public String toString() {
		return "Box [id=" + id + ", Name=" + name + ", Color=" + color.toString() + ", Weight=" + weight + ", Destination=" + destination.getName() + ", Price=" + this.getPrice() + "]";
	}
	
}
