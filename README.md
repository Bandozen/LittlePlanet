</br>

<div align="left">
<img width="full" src="https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/movingbg.gif">
</div>
</br>

# ⭐ 작은 행동으로 성장하는 우리 아이, 소행성 ⭐

**아이게게는 꼭 알려주어야 할 여러가지 생활의 지혜가 있습니다.**

**안전한 생활**을 위해 꼭 필요한 긴급구조 119 시뮬레이션부터,  
분리수거, 양치질과 같은 **생활에 꼭 필요한** 지식까지.  
지금 당장 **소행성** 탐사를 떠나보세요!

### 🚀 소행성만의 특별한 기능 🚀

    1. 교과서에서 배우던 내용을 직접 체험할 수 있어요!
    2. 모션 인식을 통해 시뮬레이션에 몰입할 수 있어요.
    3. 실시간 소켓연결과 STT(Speach-to-Text), TTS(Text-to-speech)를 통해 다양한 상황을 자연스럽게 시뮬레이션 할 수 있어요!

## 📚 목차 📚

#### [1️⃣ 개요](#개요)

#### [2️⃣ 팀 소개](#팀-소개)

#### [3️⃣ 기획배경 및 타겟](#기획배경-및-타겟)

#### [4️⃣ 파트별 기능구현 소개](#파트별-기능구현-소개)

#### [5️⃣ 서비스화면](#서비스화면)

#### [6️⃣ 사용기술스택](#사용기술스택)

#### [7️⃣ 시스템아키텍쳐](#시스템-아키텍쳐)

#### [8️⃣ 산출물](#산출물)

#### [9️⃣ 협업툴](#협업툴)

<br/>

## 개요

#### 프로젝트 기간 : 2023.10.09 ~ 2023.11.17

#### SSAFY 9기 자율 PJT - IoT 프로젝트 : 모션 인식 시뮬레이션

</br>

## 팀 소개

|   **NAME**   |                                              서정빈                                              |                                              김민국                                              |                                              박근창                                              |                                              양지혜                                              |                                              위효선                                              |                                              조찬익                                              |
| :----------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| **PROFILE**  | <img src="exec/images/profile/서정빈.png" width="100" height="130" style="border-radius: 10px;"> | <img src="exec/images/profile/김민국.png" width="100" height="130" style="border-radius: 10px;"> | <img src="exec/images/profile/박근창.png" width="100" height="130" style="border-radius: 10px;"> | <img src="exec/images/profile/양지혜.jpg" width="100" height="130" style="border-radius: 10px;"> | <img src="exec/images/profile/위효선.jpg" width="100" height="130" style="border-radius: 10px;"> | <img src="exec/images/profile/조찬익.png" width="100" height="130" style="border-radius: 10px;"> |
| **POSITION** |                                            TeamLeader                                            |                                       Simulation/WebSocket                                       |                                             HardWare                                             |                                          Simulation/App                                          |                                          Simulation/Web                                          |                                          Simulation/Web                                          |

<br/>

## 기획배경 및 타겟

### 기획배경

    1. 글로만 배우는 안전교육의 한계
    2. 체험, 실습형 안전교육 필요성은 계속 증가
    3. 능동적 학습으로 생활에 필수적인 지식을 쑥쑥!

### 타겟층

    서비스 이용층 : 초등학교 1,2학년 (방과 후 소규모 학생들이 모여있는 돌봄교실)

### 서비스 소개 

    1. 시뮬레이션 콘텐츠 선정
    2. 캐릭터 연동
    3. 모션인식을 통한 시뮬레이션 진행
    4. 웹소켓
    5. 어플과 실시간 연동 

<br/>

## 파트별 기능구현 소개

**Backend**
<br />

    - 회원가입, 로그인, JWT토큰,SpringSecurity, 회원정보 수정, 비밀번호 수정
    - 학생 등록
    - 메일 인증
        - 회원가입과 비밀번호 수정 시 실제 이메일로 인증번호 전송 후 인증
    - REDIS
        - 캐릭터 이동 방향 정보 읽고 웹소켓으로 데이터 전송
    - WebSocket
        - 여러 명의 클라이언트에게 동시에 메세지 전송
        - 같은 이메일로 등록된 클라이언트끼리만 메세지 교환
    - S3에 업로드된 콘텐츠url 관리
    - OTP 인증
    - 시뮬레이션 히스토리 관리

**Frontend - WEB**
<br />

    - 회원가입, 로그인 페이지
        - 비밀번호 오류시 Alert
        - 정확한 이메일 형식이 아닐 때 error메세지
    - 메인페이지
        - 앱 다운로드 QR 모달
    - 콘텐츠 리스트, 디테일 페이지
    - 마이페이지
    - 팀소개

**Frontend - APP**
<br />



**Hardware - raspi**
<br />

    - OTP 입력 페이지
        - OTP 인증
    - web 상태 check 페이지
        - redis를 통해 웹 상태 확인
    - 시뮬레이션 cam 페이지
        - 카메라 화면을 소켓으로 서버에 전송
    - 시뮬레이션 start 페이지
        - posenet을 통해 관절 좌표 redis로 서버에 전송
    - 서보모터
        - 상체의 중심좌표를 기준으로 서보모터 회전

**Hardware - server**
<br />

    - 연결된 기기와 소켓 통신
    - 캐릭터 이미지 변환
        - redis로 받아온 관절 좌표를 통해 분할된 이미지 변환(multiprocessing으로 속도 향상)


## 사용기술스택

|     | **WEB**             | **APP**       | **Backend**  | **CI/CD** | **Server** | **Hardware** |
| --- | ------------------- | ------------- | ------------ | --------- | ---------- | ---------- |
|     | - React             | - React-Native | - MariaDB    | - Docker  | - AWS EC2  | - Raspberrypi  |
|     | - Tailwind CSS      |               | - SpringBoot | - Jenkins |            | - Python  | 
|     | - styled-components |               |              | - Nginx   |            | - Posenet  |
|     |                     |               |              |           |            | - Tpu |

## 시스템아키텍쳐

<br/>

![image](exec/images/)

<br/>

## 서비스화면

### 메인페이지

|                          소행성                          |
| :------------------------------------------------------: |
| ![메인페이지](exec/images/screenshot/WEB_메인페이지.gif) |

<hr>

### 회원관리

|                     로그인                      |                     회원가입                      |
| :---------------------------------------------: | :-----------------------------------------------: |
| ![image](exec/images/screenshot/WEB_로그인.png) | ![image](exec/images/screenshot/WEB_회원가입.png) |

<hr>

### 마이페이지

|                     마이페이지                      |                           회원정보수정                           |                           학생등록                           |
| :-------------------------------------------------: | :--------------------------------------------------------------: | :----------------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_마이페이지.png) | ![image](exec/images/screenshot/WEB_마이페이지_회원정보수정.png) | ![image](exec/images/screenshot/WEB_마이페이지_학생등록.png) |

<hr>

### 콘텐츠 목록

|                        시뮬레이션                        |                        게임                        |
| :------------------------------------------------------: | :------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_시뮬레이션_목록.png) | ![image](exec/images/screenshot/WEB_게임_목록.png) |

<hr>

### 기기연결 및 연결확인

|                     기기연결 가이드                     |                     OTP                      |                     기기연결 확인                     |
| :-----------------------------------------------------: | :------------------------------------------: | :---------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_기기연결가이드.png) | ![image](exec/images/screenshot/WEB_otp.png) | ![image](exec/images/screenshot/WEB_기기연결확인.png) |

<hr>

### 시뮬레이션 디테일 💢

|                     119에 신고해요                      |
| :-----------------------------------------------------: |
| ![메인페이지](exec/images/screenshot/00_메인페이지.gif) |

<hr>

### 시뮬레이션 플레이

|                           인트로                           |                           아웃트로                           |
| :--------------------------------------------------------: | :----------------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_시뮬레이션_인트로.gif) | ![image](exec/images/screenshot/WEB_시뮬레이션_아웃트로.gif) |

|                           지시문                           |                           오답                           |
| :--------------------------------------------------------: | :------------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_시뮬레이션_지시문.png) | ![image](exec/images/screenshot/WEB_시뮬레이션_오답.png) |

|                           소방관                           |                           사용자                           |
| :--------------------------------------------------------: | :--------------------------------------------------------: |
| ![image](exec/images/screenshot/WEB_시뮬레이션_소방관.png) | ![image](exec/images/screenshot/WEB_시뮬레이션_사용자.png) |

### APP

|                     로그인                      |                     키패드                      |                     오답                      |
| :---------------------------------------------: | :---------------------------------------------: | :-------------------------------------------: |
| ![image](exec/images/screenshot/APP_로그인.jpg) | ![image](exec/images/screenshot/APP_키패드.jpg) | ![image](exec/images/screenshot/APP_오답.jpg) |

|                     메인                      |                     전화중                      |                     로딩                      |
| :-------------------------------------------: | :---------------------------------------------: | :-------------------------------------------: |
| ![image](exec/images/screenshot/APP_메인.jpg) | ![image](exec/images/screenshot/APP_전화중.jpg) | ![image](exec/images/screenshot/APP_로딩.jpg) |

### 팀소개 💢

|                      우리는 소행성                      |
| :-----------------------------------------------------: |
| ![메인페이지](exec/images/screenshot/00_메인페이지.gif) |

## 산출물

#### [자율PJT*광주\_2반\_C203*발표자료.pptx](./exec/) (\*.pptx)

#### [포팅 매뉴얼](./exec/포팅메뉴얼.pdf) (\*.pdf)

#### [소행성 앱](./exec/images/screenshot/APP_QR.jpg) (\*.apk)

## 협업툴
