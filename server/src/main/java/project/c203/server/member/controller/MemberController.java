package project.c203.server.member.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import project.c203.server.member.dto.MemberLoginRequest;
import project.c203.server.member.dto.MemberSignupRequest;
import project.c203.server.member.dto.MemberResponse;
import project.c203.server.member.entity.Member;
import project.c203.server.member.service.MemberService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberResponse> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
        try {
            memberService.signup(memberSignupRequest);
            return ResponseEntity.ok(new MemberResponse(true, "회원가입을 성공했습니다."));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MemberResponse(false, "회원가입을 실패했습니다. 이미 존재하는 사용자입니다."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponse> login(@RequestBody MemberLoginRequest memberLoginRequest){
        try {
            String token = memberService.login(memberLoginRequest);
            return ResponseEntity.ok(new MemberResponse(true, token));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MemberResponse(false, "로그인에 실패했습니다."));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "로그인에 실패했습니다."));
        }
    }
}
