package project.c203.server.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.c203.server.student.entity.Student;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findStudentByStudentSeq(Integer studentSeq);
    List<Student> findStudentByMember_MemberEmail(String memberEmail);
}
