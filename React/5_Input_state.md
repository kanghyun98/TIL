# Input 상태관리

이벤트에 등록하는 함수에서 이벤트 객체 e(또는 event)를 파라미터로 받을 수 있다. 여기서 e.target은 이벤트가 발생한 DOM인 input DOM을 가리킨다.

그러므로 e.target.value를 사용해 input에 입력한 값을 알 수 있고, 이를 useState로 관리하면 된다.

```jsx
function InputSample() {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text}  />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}
```



## 여러개의 Input 상태 관리

`useState`와 `onChange`를 여러개 만들어서 사용할 수도 있지만, 비효율적인 방법이다.

보다 나은 방법으로 input에 `name`을 설정하고 이벤트가 발생할 때 이 값을 참조하게 만들면 된다.

(`useState`에서는 문자열이 아닌, 객체를 관리)



```jsx
function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

```

