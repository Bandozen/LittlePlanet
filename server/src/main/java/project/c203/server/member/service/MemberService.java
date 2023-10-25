package project.c203.server.member.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import project.c203.server.config.security.jwt.JwtUtils;
import project.c203.server.member.dto.MemberEditRequest;
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

//        중복 검사
//        if (memberRepository.existsMemberByMemberEmail(memberSignupRequest.getMemberEmail())) {
//            throw new EntityExistsException();
//        }

        Member member = Member.builder()
                .memberEmail(memberSignupRequest.getMemberEmail())
                .memberPassword(passwordEncoder.encode(memberSignupRequest.getMemberPassword()))
                .memberSchool(memberSignupRequest.getMemberSchool())
                .build();
        memberRepository.save(member);
    }

    public String login(MemberLoginRequest memberLoginRequest) {
        Member member = memberRepository.findMemberByMemberEmail(memberLoginRequest.getMemberEmail())
                .orElseThrow(() -> new EntityNotFoundException());
        if (!passwordEncoder.matches(memberLoginRequest.getMemberPassword(), member.getMemberPassword())) {
            throw new BadCredentialsException("");
        }
        String token = jwtUtils.generateToken(member.getMemberEmail());
        return token;
    }

    public Member getMemberInfo(Authentication authentication) {
        String memberEmail = authentication.getName();
        Member member = memberRepository.findMemberByMemberEmail(memberEmail).get();
        return member;
    }

    public void editMemberInfo(Authentication authentication, MemberEditRequest memberEditRequest) {
        String memberEmail = authentication.getName();
        Member member = memberRepository.findMemberByMemberEmail(memberEmail).get();

        if (passwordEncoder.matches(memberEditRequest.getMemberPassword(), member.getMemberPassword())) {
            if (memberEditRequest.getMemberSchool() != null) {
                member.setMemberSchool(memberEditRequest.getMemberSchool());
            }

            if (memberEditRequest.getMemberNewPassword() != null) {
                member.setMemberPassword(passwordEncoder.encode(memberEditRequest.getMemberNewPassword()));
            }

            memberRepository.save(member);
        } else {
            throw new BadCredentialsException("");
        }

    }
}
