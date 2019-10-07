package boxinator.repositories;

import java.security.InvalidParameterException;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import boxinator.entities.Box;
import boxinator.helpers.BoxHelper;

@Repository
public class BoxRepository implements IBoxRepository {

	@Autowired
    private SessionFactory sessionFactory;
	
	@Override
	public Box find(int id) {
		Session currentSession = sessionFactory.getCurrentSession();
		Box box = currentSession.get(Box.class, id);
		return box;
	}
	
	@Override
	public List<Box> find() {
		Session session = sessionFactory.getCurrentSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Box> cq = cb.createQuery(Box.class);
		Root<Box> root = cq.from(Box.class);
		cq.select(root);
		Query query = session.createQuery(cq);
		return query.getResultList();
	}
	
	@Override
	public void delete(int id) {
		Session session = sessionFactory.getCurrentSession();
		Box box = session.byId(Box.class).load(id);
		session.delete(box);
	}

    @Override
    public void save(Box box) {
    	
    	if (!BoxHelper.IsValidName(box.getName()))
    	{
    		throw new InvalidParameterException("Entity Box can not be persisted. Value of the parameter Name is invalid!");
    	}
    	
    	if (!BoxHelper.IsValidColorString(box.getColor()))
    	{
    		throw new InvalidParameterException("Entity Box can not be persisted. Value of the parameter Color is invalid!");
    	}
    	
    	if (!BoxHelper.IsValidWeight(box.getWeight()))
    	{
    		throw new InvalidParameterException("Entity Box can not be persisted. Value of the parameter Weight is invalid!");
    	}
    	
    	if (box.getDestination() == null)
    	{
    		throw new InvalidParameterException("Entity Box can not be persisted. Destination is null!");
    	}
    	
    	if (!BoxHelper.IsValidCountryCode(box.getDestination().getCountryCode()))
    	{
    		throw new InvalidParameterException("Entity Box can not be persisted. Country code value of the Destination is invalid!");
    	}
    	
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.saveOrUpdate(box);
    }
}
