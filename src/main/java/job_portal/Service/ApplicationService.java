package job_portal.Service;

import job_portal.Entity.Application;
import job_portal.Repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application applyForJob(Application application) {
        application.setStatus("APPLIED");
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByJobSeeker(Long userId) {
        return applicationRepository.findByJobSeekerId(userId);
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public Application updateStatus(Long applicationId, String status) {

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}