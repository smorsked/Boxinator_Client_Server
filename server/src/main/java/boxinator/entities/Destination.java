package boxinator.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="Destination")
@JsonIgnoreProperties(value= {"boxes"})
public class Destination {

	@Id	
	@Column(name="CountryCode", nullable=false, length=2)	
	private String countryCode;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="PriceMultiplier")
	private float priceMultiplier;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "destination")
	private Set<Box> boxes;
	
	public Destination() { }
	
	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public float getPriceMultiplier() {
		return this.priceMultiplier;
	}
		
    public Set<Box> getBoxes() {
        return this.boxes;
    }

	public void setPriceMultiplier(float priceMultiplier) {
		this.priceMultiplier = priceMultiplier;
	}
	
	@Override
	public String toString() {
		return "Destination [countryCode=" + countryCode + ", name=" + name + ", PriceMultiplier=" + priceMultiplier + "]";
	}
}
