package project.c203.server.member.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import project.c203.server.config.security.jwt.JwtUtils;
import project.c203.server.member.dto.MemberLoginRequest;
import project.c203.server.member.dto.MemberSignupRequest;
import project.c203.server.member.entity.Member;
import project.c203.server.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;


@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public void signup(MemberSignupRequest memberSignupRequest) {

        // 중복 검사
        if (memberRepository.existsMemberByMemberEmail(memberSignupRequest.getMemberEmail())) {
            throw new EntityExistsException();
        }

        Member member = Member.builder()
                .memberEmail(memberSignupRequest.getMemberEmail())
                .memberPassword(passwordEncoder.encode(memberSignupRequest.getMemberPassword()))
                .memberSchool(memberSignupRequest.getMemberSchool())
                .build();
        memberRepository.save(member);
    }

    public String login(MemberLoginRequest memberLoginRequest) {
        Member member = memberRepository.findMemberByMemberEmail(memberLoginRequest.getMemberEmail())
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials."));
        if (!passwordEncoder.matches(memberLoginRequest.getMemberPassword(), member.getMemberPassword())) {
            throw new BadCredentialsException("Invalid credentials.");
        }
        String token = jwtUtils.generateToken(member.getMemberEmail(), member.getMemberSeq());
        return token;
    }
}
