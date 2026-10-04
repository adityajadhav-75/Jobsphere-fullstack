package job_portal.Service;

import job_portal.Entity.Job;
import job_portal.Repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Optional<Job> updateJob(Long id, Job updatedJob) {

        return jobRepository.findById(id).map(existingJob -> {

            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setCompany(updatedJob.getCompany());
            existingJob.setLocation(updatedJob.getLocation());

            return jobRepository.save(existingJob);
        });
    }

    public boolean deleteJob(Long id) {

        if (!jobRepository.existsById(id)) {
            return false;
        }

        jobRepository.deleteById(id);
        return true;
    }
}