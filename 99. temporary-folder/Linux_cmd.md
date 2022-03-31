# 리눅스 터미널 명령어

MacOS에서는 iTerm2, Windows에서는 PowerShell 기준

MacOS기준으로 하며, Window 명령어는 () 안에 



## 기본

#### man

: 메뉴얼

모르는 명령어 앞에 붙여서 명령어 설명서를 볼 수 있다.



#### clear

: 터미널 텍스트 정리



#### pwd

: 현재 경로



#### ls

: 목록

+ ls -l : 자세한 내용 (ls -force), ls -a : 숨겨진 파일, 디렉토리까지 확인



#### open (explorer)

: 해당 경로를 파일 탐색기에서 열기



#### cd

: 경로 변경

- . : 현재 경로, .. : 상위 경로, ~ : 최상위 경로, - : 이전 경로



#### find (get-childitem)

: 경로에서 파일, 디렉토리 찾기 (타입과 파일명 지정)

ex) find . -type file -name ".txt" : 현재 경로부터 시작해서 하위 경로 전체에서 txt 확장자로 끝나는 모든 파일 찾기

(get-childitem -File -Filter "*.txt" -Recurse)



#### which (get-command)

: 실행하는 프로그램의 설치 경로 확인



## 파일 생성 및 관리

#### touch (new-item)

: 새로운 파일 생성



#### mkdir

: 디렉토리 생성



#### cat

: 파일 안의 내용 확인



#### echo "내용" > 파일명 / echo "내용" >> 파일명

: 파일에 내용 추가, 덮어 씌우기

- 파일이 없을 시, 새롭게 생성



#### cp 

: 복사

cp 파일명 경로



#### mv

: 이동

 mv 파일명 경로



#### rm

: 삭제

rm -r 디렉토리: 디렉토리 내부까지 삭제



#### grep (select-string)

: 키워드로 파일 찾기

grep "키워드" *.txt : 모든 txt 파일에서 키워드를 내용에 포함한 파일 찾기

- grep -n : 몇번째 줄인지 확인
- grep -i : 대소문자 구분x
- grep -r "키워드" . : 하위 요소 전체에서 찾기

(select-string *.txt -pattern "키워드") : 윈도우에서 찾기(-r은 없음, 자동 대소문자 구분x)



## 환경 변수 설정

#### export 변수명="원하는 값" ($Env:변수명 = "원하는 값")

: 변수 생성

ex) export MY_DIR="dir1" : 앞으로 dir1 대신 MY_DIR 사용 가능



#### env (ls env:)

: 환경 변수 확인



#### $변수명 ($Env:변수명)

: 환경 변수 사용할 때 변수 앞에 $ 붙여줘야함

ex) cd $MY_DIR



#### unset 변수명 ($Env:변수명="")

: 환경 변수 삭제