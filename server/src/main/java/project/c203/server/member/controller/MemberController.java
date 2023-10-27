package project.c203.server.member.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import project.c203.server.member.dto.*;
import project.c203.server.member.entity.Member;
import project.c203.server.member.service.MemberService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.persistence.GeneratedValue;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberResponse> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
        memberService.signup(memberSignupRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MemberResponse(true, "회원가입에 성공했습니다."));
    }

    @PostMapping("/signup/authcode")
    public ResponseEntity<MemberResponse> createAuthcode(@RequestParam String emailAddress) {
        try {
            memberService.createAuthcode(emailAddress);
            return ResponseEntity.ok(new MemberResponse(true, "인증번호가 메일로 발송되었습니다."));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MemberResponse(false, "이미 가입된 메일입니다."));
        }
    }
    @PostMapping("/signup/verify")
    public ResponseEntity<MemberResponse> verifyAuthCode(@RequestBody MemberAuthcodeRequest memberAuthcodeRequest) {

            boolean isVerified = memberService.verifyAuthCode(memberAuthcodeRequest);

            if (isVerified) {
                return ResponseEntity.ok(new MemberResponse(true, "인증 성공"));
            }
            else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new MemberResponse(false, "인증 실패"));
            }
//
    }



    @PostMapping("/login")
    public ResponseEntity<MemberResponse> login(@RequestBody MemberLoginRequest memberLoginRequest, HttpServletResponse response){
        try {
            String token = memberService.login(memberLoginRequest);
            response.setHeader("Set-Cookie", "JWT=" + token + "; Path=/; Max-Age=86400; Secure; HttpOnly; Domain=k9c203.p.ssafy.io;");
            return ResponseEntity.ok(new MemberResponse(true, "로그인에 성공했습니다."));
        } catch (EntityNotFoundException | BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "로그인에 실패했습니다."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<MemberResponse> logout(HttpServletResponse response) {
        response.setHeader("Set-Cookie", "JWT=" + null + "; Path=/; Max-Age=0; Secure; HttpOnly; Domain=k9c203.p.ssafy.io;");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new MemberResponse(true, "로그아웃에 성공했습니다."));
    }

    @GetMapping
    public ResponseEntity<Member> memberInfo(Authentication authentication) {
        Member member = memberService.getMemberInfo(authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .body(member);
    }

    @PutMapping("/edit")
    public ResponseEntity<MemberResponse> editMemberInfo(@RequestBody MemberEditRequest memberEditRequest, Authentication authentication ) {
        try {
            memberService.editMemberInfo(authentication, memberEditRequest);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new MemberResponse(true, "정보 수정에 성공했습니다."));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "현재 비밀번호를 잘못 입력하였습니다."));
        }
    }

}
