# 당근 뽑기 게임 (with 움직이는 벌레들🐛)

정해진 시간 내에 움직이는 벌레들을 피해 모든 당근을 뽑으면 이기는 게임<br>
기존 [당근 뽑기 게임](https://github.com/hyunji-lee-dev/pulling-carrots-game)을 응용해 더 재밌게 만든 프로젝트

|                                                        데스크탑                                                        |                                                        모바일                                                         |
| :--------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| ![demo-desktop](https://user-images.githubusercontent.com/79075688/115543108-fb255f00-a2db-11eb-9dab-b91aca093bf5.gif) | ![demo-mobile](https://user-images.githubusercontent.com/79075688/115543104-f95b9b80-a2db-11eb-8238-d9456ff33704.gif) |

## 게임해보기 👉 [Live Demo](https://hyunji-lee-dev.github.io/pulling-carrots-game-canvas/)

### 진행방법

1. ▶ 버튼을 클릭해 게임을 시작한다. (중단하려면 ⏹ 버튼 클릭)
2. 당근을 클릭해서 뽑는다. 모든 당근이 뽑히면 승리🎉
3. 벌레를 클릭하거나, 제한시간이 지나면 패배☠
4. 게임결과 창에서 리플레이 버튼이나 종료 버튼을 클릭한다.

## 사용기술

- HTML+CSS
- JavaScript
- Web APIs

## 실습목적

- Canvas API를 사용한 애니메이션 구현
- 클래스 상속 활용

## 구현사항

### 랜덤한 방향과 속도로 움직이는 벌레들

Canvas API와 requestAnimationFrame() 사용

### Creature 클래스를 Carrot과 Bug가 상속

## 가장 어려웠던 문제

### canvas 내 요소의 클릭 감지

#### 문제핵심

실제 DOM 요소가 아니기 때문에, 변수에 할당하거나 이벤트 타겟으로 접근 불가

#### 해결방법

canvas에 이벤트 등록 후, 클릭 위치의 좌표가 해당 요소의 좌표 내에 있는지에 따라 클릭 여부 판단

```
  detectClick(e, fieldRect) {
    const x = e.clientX - fieldRect.left;
    const y = e.clientY - fieldRect.top;
    if (
        y > this.y &&
        y < this.y + this.size &&
        x > this.x &&
        x < this.x + this.size
    ) {
        this.onClick && this.onClick(Item.bug);
    }
  }
```

## 참고자료

- MDN Web Docs
- [Stack Overflow](https://stackoverflow.com/questions/9880279/how-do-i-add-a-simple-onclick-event-handler-to-a-canvas-element)
