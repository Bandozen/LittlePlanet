package project.c203.server.member.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.c203.server.config.security.jwt.JwtUtils;
import project.c203.server.member.dto.MemberAuthCodeRequest;
import project.c203.server.member.dto.MemberEditRequest;
import project.c203.server.member.dto.MemberLoginRequest;
import project.c203.server.member.dto.MemberSignupRequest;
import project.c203.server.member.entity.Member;
import project.c203.server.member.repository.MemberRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.concurrent.TimeUnit;
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final MailService mailService;
    private StringRedisTemplate stringRedisTemplate;



    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, StringRedisTemplate stringRedisTemplate, MailService mailService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.stringRedisTemplate= stringRedisTemplate;
        this.mailService = mailService;
    }

    public void signup(MemberSignupRequest memberSignupRequest) {
        Member member = Member.builder()
                .memberEmail(memberSignupRequest.getMemberEmail())
                .memberPassword(passwordEncoder.encode(memberSignupRequest.getMemberPassword()))
                .memberSchool(memberSignupRequest.getMemberSchool())
                .build();
        memberRepository.save(member);
    }

    public void createAuthCode(String emailAddress) throws Exception {
        if (memberRepository.existsMemberByMemberEmail(emailAddress)) {
            throw new EntityExistsException();
        } else {
            String authCode = String.format("%06d", (int)(Math.random() * 1000000));
            stringRedisTemplate.opsForValue().set(emailAddress, authCode, 180, TimeUnit.SECONDS);
            System.out.println(authCode);
            System.out.println(emailAddress);
            mailService.sendMail(authCode, emailAddress);
        }

    }
    public boolean verifyAuthCode (MemberAuthCodeRequest memberAuthCodeRequest) {
        String emailAddress = memberAuthCodeRequest.getEmailAddress();
        String inputAuthCode = memberAuthCodeRequest.getAuthCode();
        String storedAuthCode = stringRedisTemplate.opsForValue().get(emailAddress);
        if(storedAuthCode == null) {
            return false;
        }
        return storedAuthCode.equals(inputAuthCode);
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
            if (StringUtils.isNotBlank(memberEditRequest.getMemberSchool())) {
                member.setMemberSchool(memberEditRequest.getMemberSchool());
            }

            if (StringUtils.isNotBlank(memberEditRequest.getMemberNewPassword())) {
                member.setMemberPassword(passwordEncoder.encode(memberEditRequest.getMemberNewPassword()));
            }
            memberRepository.save(member);
        } else {
            throw new BadCredentialsException("");
        }

    }

    public String createOtp(Authentication authentication) {
        String memberEmail = authentication.getName();
        String otp = String.format("%06d", (int)(Math.random() * 1000000));
        stringRedisTemplate.opsForValue().set(otp, memberEmail, 180, TimeUnit.SECONDS);
        return otp;
    }

    public String verifyOtp(String otp) {
        String memberEmail = stringRedisTemplate.opsForValue().get(otp);
        stringRedisTemplate.opsForValue().set(otp, "true");
        return memberEmail;
    }

    public boolean connectedOtp(String otp) {
        String value = stringRedisTemplate.opsForValue().get(otp);
        if (value.equals("true")) {
            return true;
        } else {
            return false;
        }
    }
}
