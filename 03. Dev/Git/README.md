# Git 정리

괄호[ ]와 괄호 안의 내용은 지우고 상황에 맞게 사용하면 된다.

## 01. GIT 상태 확인

- **버전 확인**: `git —version`
- **파일들 상태 확인**: `git status`
- **commit log 확인**: `git log`
  - **graph로 확인:** `git log --graph`

- **이전 commit과 비교하여 파일 변경 사항 확인**: `git diff`



## 02. 사용자 관련 정보 설정

- **이름 설정**: `git config —global user.name "[이름]"`
- **이메일 설정**:  `git config —global user.email "[이메일]"`
- **이름/이메일 확인**:  `git config user.email / user.name`



## 03. remote repository에 등록

깃헙에서 레포를 만들면 명령어가 나오니 참고하도록 하자!

- **초기화(.git 생성)**: `git init`
- **전부 add & commit**: `git commit -am "[commit message]"`
- **remote repository 등록**: `git remote add [remote name] [repository address]`
  - [remote name]는 일반적으로 origin을 사용하며, `git remote` 명령어를 통해 확인할 수 있다.
- **push**: `git push [remote name] [branch]`



## 04. remote repository 클론 및 연결

- **clone**: `git clone [repository address] [DIR]`
  - [DIR] 생략 시, 현재 위치에 clone
- **remote repository 등록**: `git remote add [remote name] [repository address]`
  - [remote name]는 일반적으로 origin을 사용하며, `git remote` 명령어를 통해 확인할 수 있다.



## 05. 커밋하기 ⭐️

- **add**: `git add [file]`
  - **변경 파일 전부 add**: `git add .`
- **commit**: `git commit -m "[commit message]"`
  - 변경 파일 전부 add & commit: `git commit -am "[commit message]"`
- **push**: `git push [remote name] [branch name]`
  - [remote name], [branch]은 생략 가능하다.

## 06. 취소 / 변경 / 삭제하기 ⭐️

- **add 취소**(unstage): `git reset HEAD [file]`

  - [file] 생략 시, 모든 add 취소

- **commit 취소**

  - **revert** 명령어: `git revert [돌아갈 커밋]`

    → 커밋을 취소하는 커밋을 추가

    - revert 결과를 stage 상태 유지(commit x): `git revert —no-commit HEAD`

  - **reset** 명령어: `git reset —[option] [돌아갈 커밋]`

    → github에 push하기 이전에 취소할 때 사용 추천

    - 해당 파일들 staged 상태, 워킹 디렉토리에 보존: `git reset —soft HEAD^`
    - 해당 파일들 unstaged 상태, 워킹 디렉토리에 보존: `git reset —mixed HEAD^`
    - 해당 파일들 unstaged 상태, 워킹 디렉토리에서 삭제: `git reset —hard HEAD^`
    - 현재 워킹 디렉토리를 마지막 commit 상태로 되돌리기: `git reset —hard HEAD`
    - reset 취소: `git reset --hard ORIG_HEAD`
    - HEAD는 바로 이전 커밋을 가리킨다.

- **commit 변경**

  - **바로 이전 commit message 수정:** `git commit --amend`
  - **바로 이전 commit 에 새로운 파일 변경 사항을 추가하기:** `git commit -C HEAD --amend`
  
  

## 07. 브랜치 관련 ⭐️

### **브랜치 생성 / 이동/ 삭제**

- **브랜치 확인:** `git branch`
- **브랜치 생성:** `git branch [branch]`
- **브랜치 이동:** `git checkout [branch]`
- **브랜치 삭제**: `git branch -D [branch]`
- **원격 브랜치 삭제**: `git push -d origin [branch]`
- **원격 브랜치 추적:** `git remote update git checkout -t origin/[branch]`
- **원격 브랜치 반영**: `git remote prune origin`
- **원격 브랜치 확인**: `git branch -r`
- **로컬 브랜치 확인**: `git branch -a`



### **브랜치 병합**

- **Merge**: `git merge [branch]` → branch 생성(merge) 내역을 남기고 병합, (dev 브랜치를 main 브랜치에 병합하고 싶으면, main 브랜치에서 해당 명령어 실행)
- **Rebase and Merge**: `git rebase [branch]` → branch 생성(merge) 내역을 남기지 않고 병합(branch에서의 커밋들을 그대로)
- **Squash and Merge**: `git rebase -i HEAD~[commit 개수]` → branch 생성(merge) 내역을 남기지 않고 병합(branch에서의 커밋들을 하나로 통일)

⇒ 브랜치 생성 내역까지 모두 남기고 싶다면 그냥 merge, 커밋들만 남겨두고 싶다면 **rebase merge**, commit을 merge할 때만 남겨 깔끔하게 관리하고 싶다면 **squash merge**가 좋을 것 같다



## 08. 풀리퀘 (Pull Request) ⭐️

(브랜치에서 작업한 결과물을 풀리퀘하는 경우 4단계부터 진행)

1. 기여하려는 저장소 Fork (github repo 우측 상단에 fork 버튼)
2. clone, remote설정
   - **clone**: `git clone [repository address] [DIR]` 
     - [DIR] 생략 시, 현재 위치에 clone
   - **remote repository 등록**: `git remote add [remote name] [repository address]`
     - [remote name]는 일반적으로 origin을 사용하며, `git remote` 명령어를 통해 확인할 수 있다.
3. branch 생성
   - **branch** **생성, 이동:** `git checkout -b [branch]`
4. 생성한 branch에서 수정 작업 후 add, commit, push
   - **특정 파일 add**: `git add [file]`
     - 변경 파일 전부 add: `git add .`
   - **commit**: `git commit -m "[commit message]"`
     - 변경 파일 전부 add & commit: `git commit -am "[commit message]"`
   - **push**: `git push [remote name] [branch name]`
     - 생성한 [branch]로 push
5. Pull Request 생성 (본인 github repo의 compare&pull request 버튼)
6. 코드리뷰, Merge Pull Reqest (기존 repo 주인이 PR 승인 및 merge)
7. branch 삭제: `git branch -D [branch]`



## 09. 단축키

`Git`을 설치한 디렉토리에는 `.gitconfig` 파일이 존재한다. 이 파일에서 자주 사용하는 명령어에 대해서 alias 를 지정해줄 수 있다.

```
[alias]
    g = git
    st = status
    co = checkout
    ad = add
    cm = commit -m
    acm = commit -am
    ph = push
    rb = rebase -i
    fh = fetch
    df = diff
    br = branch -a
    lg = log --graph --abbrev-commit --decorate --format=format:'%C(cyan)%h%C(reset) - %C(green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(yellow)%d%    C(reset)' --all
    re = reset HEAD\\\\^
    fu = fetch upstream
    rum = rebase upstream/master
    pom = push origin master
    list = config --get-regexp alias
    readme = !git add . && git commit -m "Update README.md" && git push origin master
    docs = !git add . && git commit -m "Update" && git push origin master
    update = !git fetch upstream && git rebase upstream/master && git push origin master
```