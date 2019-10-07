package boxinator.services;

import java.util.List;

import boxinator.entities.Box;

public interface IBoxService {
	
	public List<Box> find();

	public void save(Box box);

	public Box find(int id);

	public void delete(int id);
}