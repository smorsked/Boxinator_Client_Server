package boxinator.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import boxinator.entities.Box;
import boxinator.repositories.IBoxRepository;

@Service
public class BoxService implements IBoxService {

	@Autowired
    private IBoxRepository repository;

	@Override
	@Transactional
	public Box find(int id) {
		return repository.find(id);
	}
	
	@Override
	@Transactional
	public List<Box> find() {
		return repository.find();
	}
	
    @Override
    @Transactional
    public void save(Box box) {
    	repository.save(box);
    }
    
    @Override
	@Transactional
	public void delete(int id) {
    	repository.delete(id);
	}    
}
