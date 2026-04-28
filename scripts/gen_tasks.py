"""Bulk-generate Task[] TypeScript source for lib/tasks/{probability,statistics,economics,geometry}.ts.

Pro-tip: this is a build-time helper, not a runtime module.
It keeps task definitions compact as Python dicts, then renders them to TypeScript.

Run:  python3 scripts/gen_tasks.py
"""

from __future__ import annotations
import json
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parent.parent


def jstr(s: str) -> str:
    # Render a Python str as a double-quoted TS string with escaping.
    return json.dumps(s, ensure_ascii=False)


def task_to_ts(t: dict) -> str:
    ans = t["answer"]
    if ans["kind"] == "numeric":
        ans_str = f'{{ kind: "numeric", value: {ans["value"]}, tolerance: {ans.get("tolerance", 0.01)} }}'
    else:
        raise NotImplementedError
    hints = ",\n".join(
        f'      {{ level: {h["level"]}, title: {jstr(h["title"])}, body: {jstr(h["body"])} }}'
        for h in t["hints"]
    )
    solution = ",\n".join(f"      {jstr(s)}" for s in t["solution"])
    related = json.dumps(t.get("related", []), ensure_ascii=False)
    return dedent(
        f"""  {{
    id: {jstr(t["id"])},
    topic: {jstr(t["topic"])},
    examNumber: {t["examNumber"]},
    examLevel: {jstr(t["examLevel"])},
    subtopic: {jstr(t["subtopic"])},
    difficulty: {jstr(t["difficulty"])},
    source: {jstr(t.get("source", "Открытый банк ФИПИ (тип задания)"))},
    statement: {jstr(t["statement"])},
    answer: {ans_str},
    hints: [
{hints},
    ],
    solution: [
{solution},
    ],
    relatedHandbookTopics: {related},
  }},"""
    ).strip("\n")


HEADER = {
    "probability": (
        "/**\n * Задачи на теорию вероятностей (ЕГЭ профиль 2025: №4 и №5).\n"
        " * Сгенерировано через scripts/gen_tasks.py — не правьте файл вручную.\n"
        " */"
    ),
    "statistics": (
        "/**\n * Задачи на статистику (ЕГЭ база №9 / профиль №11).\n"
        " * Сгенерировано через scripts/gen_tasks.py — не правьте файл вручную.\n"
        " */"
    ),
    "economics": (
        "/**\n * Экономические задачи (ЕГЭ профиль №16).\n"
        " * Сгенерировано через scripts/gen_tasks.py — не правьте файл вручную.\n"
        " */"
    ),
    "geometry": (
        "/**\n * Геометрия: планиметрия (№1), векторы (№2), стереометрия (№3).\n"
        " * Сгенерировано через scripts/gen_tasks.py — не правьте файл вручную.\n"
        " */"
    ),
}


def render(topic: str, tasks: list[dict]) -> str:
    body = "\n".join(task_to_ts(t) for t in tasks)
    return (
        f'import type {{ Task }} from "../types";\n\n'
        f"{HEADER[topic]}\n\n"
        f"export const {topic}Tasks: Task[] = [\n{body}\n];\n"
    )


# ===========================================================================
# Helper for tasks (DRY): shortcut for numeric answer + 3 hints
# ===========================================================================

def mk(
    *,
    id: str,
    topic: str,
    examNumber: int,
    examLevel: str,
    subtopic: str,
    difficulty: str,
    statement: str,
    answer: float,
    tolerance: float = 0.01,
    hint1: str,
    hint2: str,
    hint3: str,
    solution: list[str],
    related: list[str] | None = None,
    source: str = "Открытый банк ФИПИ (тип задания)",
) -> dict:
    return {
        "id": id,
        "topic": topic,
        "examNumber": examNumber,
        "examLevel": examLevel,
        "subtopic": subtopic,
        "difficulty": difficulty,
        "source": source,
        "statement": statement,
        "answer": {"kind": "numeric", "value": answer, "tolerance": tolerance},
        "hints": [
            {"level": 1, "title": "Подсказка", "body": hint1},
            {"level": 2, "title": "План", "body": hint2},
            {"level": 3, "title": "Разбор", "body": hint3},
        ],
        "solution": solution,
        "related": related or [],
    }


# ===========================================================================
# PROBABILITY — all tasks (existing + new, aiming for ~30)
# ===========================================================================

PROB = []

# --- existing (3 classical №4) ---
PROB.append(mk(
    id="prob-classical-coin-2", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="Монету подбрасывают два раза. Найдите вероятность того, что орёл выпадет ровно один раз.",
    answer=0.5, tolerance=0.001,
    hint1="Перечислите все элементарные исходы двух подбрасываний — их 4.",
    hint2="Найдите количество исходов, в которых ровно один орёл, и поделите на общее число исходов: $P=\\dfrac{m}{n}$.",
    hint3="Исходы: ОО, ОР, РО, РР. Ровно один орёл в исходах ОР и РО — два благоприятных. $P=\\dfrac{2}{4}=0{,}5$.",
    solution=[
        "Всего исходов: $2 \\cdot 2 = 4$ — это ОО, ОР, РО, РР.",
        "Благоприятных (ровно один орёл): ОР, РО — два исхода.",
        "$P = \\dfrac{2}{4} = 0{,}5$.",
    ],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-tickets", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="На экзамене 25 билетов, Сергей не выучил 5 из них. Найдите вероятность того, что ему попадётся выученный билет.",
    answer=0.8, tolerance=0.001,
    hint1="Сколько билетов он выучил?",
    hint2="Поделите количество выученных билетов на общее число.",
    hint3="$P=\\dfrac{25-5}{25}=\\dfrac{20}{25}=0{,}8$.",
    solution=["Выученных билетов: $25-5=20$.", "$P=\\dfrac{20}{25}=0{,}8$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-olympiad-rooms", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="На олимпиаде по математике 550 участников разместили в четырёх аудиториях. В первых трёх удалось разместить по 110 человек, оставшихся перевели в запасную аудиторию. Найдите вероятность того, что случайно выбранный участник писал олимпиаду в запасной аудитории.",
    answer=0.4, tolerance=0.001,
    hint1="Сколько человек село в первые три аудитории?",
    hint2="Найдите число человек в запасной аудитории и поделите на 550.",
    hint3="В первых трёх: $3 \\cdot 110 = 330$. В запасной: $550-330=220$. $P=\\dfrac{220}{550}=0{,}4$.",
    solution=[
        "В первых трёх: $3 \\cdot 110 = 330$.",
        "В запасной: $550-330=220$.",
        "$P=\\dfrac{220}{550}=0{,}4$.",
    ],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-union", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Объединение и пересечение событий", difficulty="medium",
    statement="Вероятность того, что новый компьютер прослужит больше года, равна $0{,}97$. Вероятность того, что он прослужит больше двух лет, равна $0{,}89$. Найдите вероятность того, что компьютер прослужит больше года, но меньше двух лет.",
    answer=0.08, tolerance=0.001,
    hint1="Если $A$ — «больше года», а $B$ — «больше двух лет», то $B \\subset A$.",
    hint2="Искомое событие = $A \\setminus B$. $P(A \\setminus B) = P(A) - P(B)$.",
    hint3="$P = 0{,}97 - 0{,}89 = 0{,}08$.",
    solution=[
        "Событие «больше двух лет» содержится в «больше года».",
        "$P = 0{,}97 - 0{,}89 = 0{,}08$.",
    ],
    related=["hb-probability-union"],
))
PROB.append(mk(
    id="prob-bernoulli-shooter", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Бернулли", difficulty="medium",
    statement="Вероятность поражения мишени при одном выстреле равна $0{,}8$. Стрелок производит 3 независимых выстрела. Найдите вероятность того, что мишень будет поражена ровно два раза.",
    answer=0.384, tolerance=0.001,
    hint1="Это схема Бернулли: $n=3$, $p=0{,}8$, $k=2$.",
    hint2="$P_n(k) = C_n^k p^k (1-p)^{n-k}$.",
    hint3="$C_3^2 = 3$. $P = 3 \\cdot 0{,}8^2 \\cdot 0{,}2 = 0{,}384$.",
    solution=[
        "$C_3^2=3$, $0{,}8^2 = 0{,}64$, $0{,}64 \\cdot 0{,}2 = 0{,}128$.",
        "$P = 3 \\cdot 0{,}128 = 0{,}384$.",
    ],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-coin-4-times", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Бернулли", difficulty="medium",
    statement="Монету бросают 4 раза. Найдите вероятность того, что орёл выпадет ровно 2 раза.",
    answer=0.375, tolerance=0.001,
    hint1="$n=4$, $k=2$, $p=0{,}5$.",
    hint2="$P = C_4^2 \\cdot p^k \\cdot (1-p)^{n-k}$.",
    hint3="$C_4^2 = 6$. $P = 6 \\cdot 0{,}5^4 = 0{,}375$.",
    solution=["$C_4^2 = 6$, $0{,}5^4 = 0{,}0625$.", "$P = 6 \\cdot 0{,}0625 = 0{,}375$."],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-total-factory", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула полной вероятности", difficulty="hard",
    statement="В магазине поступают батарейки от двух поставщиков: 60% от первого и 40% от второго. У первого брак — 2%, у второго — 5%. Найдите вероятность того, что случайно выбранная батарейка окажется бракованной.",
    answer=0.032, tolerance=0.001,
    hint1="$H_1$ — от первого, $H_2$ — от второго.",
    hint2="$P(A) = P(H_1)P(A|H_1) + P(H_2)P(A|H_2)$.",
    hint3="$P = 0{,}6 \\cdot 0{,}02 + 0{,}4 \\cdot 0{,}05 = 0{,}032$.",
    solution=["$P(H_1)=0{,}6$, $P(H_2)=0{,}4$.", "$P=0{,}6 \\cdot 0{,}02 + 0{,}4 \\cdot 0{,}05 = 0{,}032$."],
    related=["hb-probability-total"],
))
PROB.append(mk(
    id="prob-conditional-cards", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Условная вероятность", difficulty="medium",
    statement="Вероятность того, что батарейка бракованная, равна $0{,}06$. Покупатель берёт упаковку из 2 батареек. Найдите вероятность того, что обе батарейки исправны.",
    answer=0.8836, tolerance=0.001,
    hint1="Вероятность исправности одной батарейки?",
    hint2="Если батарейки независимы, вероятности перемножаются.",
    hint3="$P(\\text{исправна}) = 0{,}94$. $P(\\text{обе}) = 0{,}94^2 = 0{,}8836$.",
    solution=["$P(\\text{исправна}) = 1 - 0{,}06 = 0{,}94$.", "$P = 0{,}94^2 = 0{,}8836$."],
    related=["hb-probability-union", "hb-probability-conditional"],
))
PROB.append(mk(
    id="prob-geometric-segment", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Геометрическая вероятность", difficulty="easy",
    statement="На отрезке $[0;\\,5]$ случайным образом выбирается точка. Найдите вероятность того, что её координата больше 3.",
    answer=0.4, tolerance=0.001,
    hint1="Какая часть отрезка удовлетворяет условию?",
    hint2="$P = \\dfrac{\\text{длина}(A)}{\\text{длина}(\\Omega)}$.",
    hint3="Длина благоприятной области $[3;5]$ равна 2, всей $[0;5]$ — 5. $P = 2/5 = 0{,}4$.",
    solution=["Благоприятная область — отрезок $[3;5]$ длины 2.", "$P = 2/5 = 0{,}4$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-dice-six", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="Игральную кость бросают один раз. Найдите вероятность того, что выпадет более 4 очков.",
    answer=1/3, tolerance=0.01,
    hint1="Какие из 6 граней дают «более 4»?",
    hint2="Поделите количество благоприятных на 6.",
    hint3="Благоприятны 5 и 6: $P = 2/6 = 1/3 \\approx 0{,}33$.",
    solution=["Благоприятных исходов: 2 (5 и 6 очков).", "$P = 2/6 = 1/3 \\approx 0{,}33$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-bernoulli-test-questions", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Бернулли", difficulty="medium",
    statement="Стрелок попадает в мишень с вероятностью $0{,}9$. Он делает 5 независимых выстрелов. Найдите вероятность того, что он попадёт ровно 4 раза.",
    answer=0.32805, tolerance=0.001,
    hint1="Схема Бернулли: $n=5$, $p=0{,}9$, $k=4$.",
    hint2="$P_n(k) = C_n^k p^k (1-p)^{n-k}$.",
    hint3="$C_5^4 = 5$. $P = 5 \\cdot 0{,}9^4 \\cdot 0{,}1 = 0{,}32805$.",
    solution=["$C_5^4 = 5$, $0{,}9^4 = 0{,}6561$.", "$P = 5 \\cdot 0{,}6561 \\cdot 0{,}1 = 0{,}32805$."],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-total-disease", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула полной вероятности", difficulty="hard",
    statement="В первой коробке 3 синих и 7 красных шаров. Во второй — 6 синих и 4 красных. Подбрасывают честную монету: при «орле» шар достают из первой коробки, при «решке» — из второй. Найдите вероятность того, что вынутый шар синий.",
    answer=0.45, tolerance=0.001,
    hint1="$H_1$ — выбрана 1-я коробка, $H_2$ — 2-я.",
    hint2="$P = P(H_1)P(C|H_1) + P(H_2)P(C|H_2)$.",
    hint3="$P = 0{,}5 \\cdot 0{,}3 + 0{,}5 \\cdot 0{,}6 = 0{,}45$.",
    solution=["$P(C|H_1) = 3/10 = 0{,}3$, $P(C|H_2) = 6/10 = 0{,}6$.", "$P = 0{,}5(0{,}3 + 0{,}6) = 0{,}45$."],
    related=["hb-probability-total"],
))

# --- NEW probability tasks (+18) ---
PROB.append(mk(
    id="prob-classical-red-ball", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="В урне 8 белых и 12 чёрных шаров. Наугад вытягивают один шар. Найдите вероятность того, что он белый.",
    answer=0.4, tolerance=0.001,
    hint1="Общее число шаров — сумма белых и чёрных.",
    hint2="$P = \\dfrac{\\text{белых}}{\\text{всего}}$.",
    hint3="$P = 8/(8+12) = 8/20 = 0{,}4$.",
    solution=["Всего шаров: $8+12=20$.", "$P = 8/20 = 0{,}4$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-ball-not-red", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="В корзине 4 красных, 3 жёлтых и 3 зелёных яблока. Случайно берут одно. Найдите вероятность того, что оно не красное.",
    answer=0.6, tolerance=0.001,
    hint1="Сколько яблок не красные?",
    hint2="Поделите на общее число.",
    hint3="$P = (3+3)/10 = 0{,}6$. Или: $P = 1 - 4/10 = 0{,}6$.",
    solution=["Некрасных: $3+3 = 6$.", "$P = 6/10 = 0{,}6$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-weekday", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="В случайном эксперименте из колоды в 36 карт берут одну. Найдите вероятность того, что это туз.",
    answer=1/9, tolerance=0.01,
    hint1="Сколько тузов в колоде 36 карт?",
    hint2="Поделите количество тузов на 36.",
    hint3="Тузов — 4. $P = 4/36 = 1/9 \\approx 0{,}11$.",
    solution=["Тузов в колоде 4.", "$P = 4/36 = 1/9 \\approx 0{,}11$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-dice-sum", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="medium",
    statement="Бросают две игральные кости. Найдите вероятность того, что сумма выпавших очков равна 7.",
    answer=1/6, tolerance=0.01,
    hint1="Сколько всего исходов при броске двух костей?",
    hint2="Сколько пар даёт сумму 7? Выпишите их.",
    hint3="Всего $6 \\cdot 6 = 36$ исходов. Сумма 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 исходов. $P = 6/36 = 1/6$.",
    solution=["Всего исходов: $6 \\times 6 = 36$.", "Сумма 7 достигается в 6 парах.", "$P = 6/36 \\approx 0{,}167$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-classical-team", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="В классе 12 девочек и 13 мальчиков. Для дежурства случайно выбирают одного ученика. Найдите вероятность того, что это мальчик.",
    answer=0.52, tolerance=0.005,
    hint1="Поделите число мальчиков на общее число учеников.",
    hint2="$P = \\dfrac{13}{12+13}$.",
    hint3="$P = 13/25 = 0{,}52$.",
    solution=["Всего $12+13 = 25$ учеников.", "$P = 13/25 = 0{,}52$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-complement-shooter", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Противоположное событие", difficulty="medium",
    statement="Вероятность попадания при одном выстреле равна $0{,}7$. Стрелок стреляет 3 раза. Найдите вероятность того, что он попадёт хотя бы один раз.",
    answer=0.973, tolerance=0.001,
    hint1="Проще посчитать вероятность противоположного события — ни разу не попасть.",
    hint2="$P(\\text{ни одного}) = (1-p)^n = 0{,}3^3$.",
    hint3="$P(\\text{ни одного}) = 0{,}027$. $P(\\text{хотя бы одно}) = 1 - 0{,}027 = 0{,}973$.",
    solution=["$P(\\text{ни одного}) = 0{,}3^3 = 0{,}027$.", "$P(\\text{хотя бы одно}) = 1 - 0{,}027 = 0{,}973$."],
    related=["hb-probability-union"],
))
PROB.append(mk(
    id="prob-complement-two-weeks", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Противоположное событие", difficulty="easy",
    statement="Вероятность того, что в магазине закончится нужный товар за неделю, равна $0{,}18$. Найдите вероятность того, что товар не закончится.",
    answer=0.82, tolerance=0.001,
    hint1="Это противоположное событие.",
    hint2="$P(\\bar A) = 1 - P(A)$.",
    hint3="$P = 1 - 0{,}18 = 0{,}82$.",
    solution=["$P(\\bar A) = 1 - 0{,}18 = 0{,}82$."],
    related=["hb-probability-union"],
))
PROB.append(mk(
    id="prob-indep-two-events", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Независимые события", difficulty="medium",
    statement="Две независимые лампы работают. Вероятность того, что за год не перегорит первая, равна $0{,}9$, а вторая — $0{,}8$. Найдите вероятность того, что за год не перегорит ни одна из них.",
    answer=0.72, tolerance=0.001,
    hint1="События независимы — вероятности перемножаются.",
    hint2="$P(A \\cap B) = P(A) \\cdot P(B)$.",
    hint3="$P = 0{,}9 \\cdot 0{,}8 = 0{,}72$.",
    solution=["$P = 0{,}9 \\cdot 0{,}8 = 0{,}72$."],
    related=["hb-probability-union", "hb-probability-conditional"],
))
PROB.append(mk(
    id="prob-sequential-defect", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Независимые события", difficulty="medium",
    statement="На фабрике из 100 деталей 5 бракованных. Контролёр наугад берёт одну деталь, проверяет и кладёт обратно, затем берёт ещё одну. Найдите вероятность того, что обе окажутся бракованными.",
    answer=0.0025, tolerance=1e-5,
    hint1="Деталь возвращают — испытания независимы.",
    hint2="$P = P(\\text{брак})^2$.",
    hint3="$P(\\text{брак}) = 5/100 = 0{,}05$. $P(\\text{оба брак}) = 0{,}05^2 = 0{,}0025$.",
    solution=["$P(\\text{брак}) = 0{,}05$.", "$P = 0{,}05^2 = 0{,}0025$."],
    related=["hb-probability-union", "hb-probability-conditional"],
))
PROB.append(mk(
    id="prob-bernoulli-exam", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Бернулли", difficulty="hard",
    statement="В лотерее выигрышный билет встречается с вероятностью $0{,}2$. Покупают 4 билета. Найдите вероятность того, что ровно 1 из них выигрышный.",
    answer=0.4096, tolerance=0.001,
    hint1="Схема Бернулли: $n=4$, $k=1$, $p=0{,}2$.",
    hint2="$P_n(k) = C_n^k p^k (1-p)^{n-k}$.",
    hint3="$C_4^1 = 4$. $P = 4 \\cdot 0{,}2 \\cdot 0{,}8^3 = 4 \\cdot 0{,}2 \\cdot 0{,}512 = 0{,}4096$.",
    solution=["$C_4^1 = 4$, $0{,}8^3 = 0{,}512$.", "$P = 4 \\cdot 0{,}2 \\cdot 0{,}512 = 0{,}4096$."],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-bernoulli-exactly-zero", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Бернулли", difficulty="medium",
    statement="Всхожесть семян равна $0{,}9$. Посадили 5 семян. Найдите вероятность того, что ни одно из них не взойдёт.",
    answer=1e-5, tolerance=1e-6,
    hint1="$P(\\text{не взошло одно}) = 1 - 0{,}9 = 0{,}1$.",
    hint2="Независимые события — вероятности перемножаются.",
    hint3="$P = 0{,}1^5 = 0{,}00001$.",
    solution=["$P(\\text{не взойдёт одно}) = 0{,}1$.", "$P = 0{,}1^5 = 10^{-5}$."],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-union-soccer", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Объединение событий", difficulty="medium",
    statement="В магазине доля бракованных лампочек равна $0{,}04$, доля лампочек с пониженной яркостью — $0{,}01$. Некоторые лампочки имеют обе проблемы: $0{,}005$. Найдите вероятность того, что случайно выбранная лампочка имеет хотя бы один дефект.",
    answer=0.045, tolerance=0.0005,
    hint1="Формула объединения: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
    hint2="Подставьте: $A$ — брак, $B$ — пониженная яркость.",
    hint3="$P = 0{,}04 + 0{,}01 - 0{,}005 = 0{,}045$.",
    solution=["$P(A \\cup B) = 0{,}04 + 0{,}01 - 0{,}005 = 0{,}045$."],
    related=["hb-probability-union"],
))
PROB.append(mk(
    id="prob-total-three-factories", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула полной вероятности", difficulty="hard",
    statement="Комплектующие поступают с трёх заводов: 50%, 30% и 20%. Брак: 1%, 2% и 5% соответственно. Найдите вероятность того, что случайная деталь бракованная.",
    answer=0.021, tolerance=0.0005,
    hint1="Формула полной вероятности с тремя гипотезами.",
    hint2="$P = 0{,}5 \\cdot 0{,}01 + 0{,}3 \\cdot 0{,}02 + 0{,}2 \\cdot 0{,}05$.",
    hint3="$P = 0{,}005 + 0{,}006 + 0{,}01 = 0{,}021$.",
    solution=["$P = 0{,}5 \\cdot 0{,}01 + 0{,}3 \\cdot 0{,}02 + 0{,}2 \\cdot 0{,}05$.", "$= 0{,}005 + 0{,}006 + 0{,}010 = 0{,}021$."],
    related=["hb-probability-total"],
))
PROB.append(mk(
    id="prob-conditional-jar", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Условная вероятность", difficulty="hard",
    statement="В урне 5 белых и 5 чёрных шаров. Последовательно вытягивают 2 шара без возвращения. Найдите вероятность того, что оба белых.",
    answer=2/9, tolerance=0.01,
    hint1="$P(A \\cap B) = P(A) \\cdot P(B \\mid A)$.",
    hint2="После первого белого в урне осталось 4 белых из 9.",
    hint3="$P = \\dfrac{5}{10} \\cdot \\dfrac{4}{9} = \\dfrac{20}{90} = \\dfrac{2}{9} \\approx 0{,}22$.",
    solution=["$P = (5/10) \\cdot (4/9) = 20/90 = 2/9 \\approx 0{,}22$."],
    related=["hb-probability-conditional"],
))
PROB.append(mk(
    id="prob-geometric-square", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Геометрическая вероятность", difficulty="medium",
    statement="В квадрате со стороной 1 наугад выбирают точку. Найдите вероятность того, что она окажется внутри вписанного круга.",
    answer=3.14159265/4, tolerance=0.005,
    hint1="Вписанная окружность имеет радиус $1/2$.",
    hint2="$P = \\dfrac{S_{\\text{круга}}}{S_{\\text{квадрата}}}$.",
    hint3="$S_{\\text{круга}} = \\pi/4$, $S_{\\text{квадрата}} = 1$. $P = \\pi/4 \\approx 0{,}785$.",
    solution=["$S_{\\text{круга}} = \\pi r^2 = \\pi/4$.", "$P = (\\pi/4)/1 = \\pi/4 \\approx 0{,}785$."],
    related=["hb-probability-classical"],
))
PROB.append(mk(
    id="prob-two-red-shots", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Независимые события", difficulty="medium",
    statement="Иван делает 2 выстрела по мишени. Вероятность попадания равна $0{,}6$ при каждом выстреле. Найдите вероятность того, что он попадёт ровно в 1 раз.",
    answer=0.48, tolerance=0.001,
    hint1="«Попал + промазал» или «промазал + попал».",
    hint2="$P = 2 \\cdot p \\cdot (1-p)$ (по формуле Бернулли).",
    hint3="$P = 2 \\cdot 0{,}6 \\cdot 0{,}4 = 0{,}48$.",
    solution=["$P = 2 \\cdot 0{,}6 \\cdot 0{,}4 = 0{,}48$."],
    related=["hb-probability-bernoulli"],
))
PROB.append(mk(
    id="prob-bayes-test", topic="probability", examNumber=5, examLevel="профиль",
    subtopic="Формула Байеса", difficulty="hard",
    statement="Из двух автоматов 1-й производит 70% продукции, 2-й — 30%. Брак у 1-го — 1%, у 2-го — 4%. Найдите вероятность того, что случайно выбранная деталь бракованная.",
    answer=0.019, tolerance=0.0005,
    hint1="Формула полной вероятности.",
    hint2="$P = 0{,}7 \\cdot 0{,}01 + 0{,}3 \\cdot 0{,}04$.",
    hint3="$P = 0{,}007 + 0{,}012 = 0{,}019$.",
    solution=["$P = 0{,}007 + 0{,}012 = 0{,}019$."],
    related=["hb-probability-total"],
))
PROB.append(mk(
    id="prob-hospital-boys", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="Вероятность рождения мальчика равна $0{,}512$. В некотором роддоме в понедельник родились 2 ребёнка. Найдите вероятность того, что оба мальчики.",
    answer=0.512**2, tolerance=0.001,
    hint1="События независимы — перемножаем вероятности.",
    hint2="$P = 0{,}512 \\cdot 0{,}512$.",
    hint3="$P = 0{,}512^2 \\approx 0{,}262$.",
    solution=["$P = 0{,}512^2 \\approx 0{,}262$."],
    related=["hb-probability-classical", "hb-probability-union"],
))
PROB.append(mk(
    id="prob-taxi-free", topic="probability", examNumber=4, examLevel="профиль",
    subtopic="Классическая вероятность", difficulty="easy",
    statement="Пассажир заказал такси. Вероятность того, что к нему приедет белая машина, равна $0{,}25$. А вероятность, что не белая — соответственно, $0{,}75$. Найдите вероятность того, что приедет не белое такси.",
    answer=0.75, tolerance=0.001,
    hint1="$P(\\bar A) = 1 - P(A)$.",
    hint2="$P = 1 - 0{,}25$.",
    hint3="$P = 0{,}75$.",
    solution=["$P = 1 - 0{,}25 = 0{,}75$."],
    related=["hb-probability-union"],
))

# ===========================================================================
# STATISTICS — aim for ~30
# ===========================================================================
STAT = []

# --- existing ---
STAT.append(mk(
    id="stat-mean", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Среднее арифметическое", difficulty="easy",
    statement="Найдите среднее арифметическое чисел: 1, 5, 7, 12, 15.",
    answer=8, tolerance=0.001,
    hint1="Сумма всех чисел, делённая на их количество.",
    hint2="$1+5+7+12+15 = 40$.",
    hint3="$\\bar{x} = 40/5 = 8$.",
    solution=["Сумма: 40. Количество: 5.", "$\\bar{x} = 40/5 = 8$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-median", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Медиана", difficulty="easy",
    statement="Найдите медиану ряда чисел: 2, 8, 11, 4, 6, 15, 3.",
    answer=6, tolerance=0.001,
    hint1="Медиана — середина упорядоченного ряда.",
    hint2="Упорядочьте: 2, 3, 4, 6, 8, 11, 15.",
    hint3="В ряду 7 чисел, медиана — четвёртое: 6.",
    solution=["Упорядоченный ряд: 2, 3, 4, 6, 8, 11, 15.", "Медиана — 4-й элемент: 6."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-range", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Размах", difficulty="easy",
    statement="Найдите размах ряда чисел: 12, 5, 18, 3, 22, 11.",
    answer=19, tolerance=0.001,
    hint1="Размах — разность наибольшего и наименьшего.",
    hint2="max = 22, min = 3.",
    hint3="$R = 22 - 3 = 19$.",
    solution=["max = 22, min = 3.", "$R = 19$."],
    related=["hb-statistics-spread"],
))
STAT.append(mk(
    id="stat-mean-median-mismatch", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Средние величины", difficulty="medium",
    statement="В наборе 9 чисел медиана равна 5, а среднее арифметическое равно 6. Если из набора убрать число 5, то медиана нового набора будет равна 4. Чему равно среднее арифметическое нового набора?",
    answer=6.125, tolerance=0.001,
    hint1="Сумма исходных 9 чисел = $9 \\cdot 6 = 54$.",
    hint2="После удаления числа 5 сумма = 49, чисел 8.",
    hint3="$\\bar{x} = 49/8 = 6{,}125$.",
    solution=["$9 \\cdot 6 = 54$.", "$54 - 5 = 49$.", "$49/8 = 6{,}125$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-frequency", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Частота и доля", difficulty="medium",
    statement="За контрольную по алгебре в классе из 25 учеников «5» получили 4, «4» получили 12, «3» получили 7, остальные получили «2». Какую долю от общего числа учеников составляют двоечники? Дайте ответ в виде десятичной дроби.",
    answer=0.08, tolerance=0.001,
    hint1="Сколько двоечников? $25 - 4 - 12 - 7 = 2$.",
    hint2="Доля = количество / общее число.",
    hint3="$\\dfrac{2}{25} = 0{,}08$.",
    solution=["Двоечников: $25-4-12-7 = 2$.", "$2/25 = 0{,}08$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-graph-temperature", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Чтение графиков", difficulty="easy",
    statement="В понедельник температура была 5 °C, во вторник 7 °C, в среду 4 °C, в четверг 6 °C, в пятницу 3 °C. Найдите среднюю температуру за эти 5 дней.",
    answer=5, tolerance=0.001,
    hint1="Сложите все 5 значений.",
    hint2="Сумму поделите на 5.",
    hint3="$5+7+4+6+3 = 25$. $25/5 = 5$.",
    solution=["Сумма: 25.", "Средняя: $25/5 = 5$."],
    related=["hb-statistics-averages", "hb-statistics-graphs"],
))
STAT.append(mk(
    id="stat-mode", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Мода", difficulty="easy",
    statement="Найдите моду ряда чисел: 3, 5, 5, 7, 8, 5, 9, 3.",
    answer=5, tolerance=0.001,
    hint1="Мода — самое частое число.",
    hint2="Подсчитайте количество каждого числа.",
    hint3="5 встречается 3 раза — больше всех. Мода = 5.",
    solution=["3 (×2), 5 (×3), 7, 8, 9.", "Мода = 5."],
    related=["hb-statistics-averages"],
))

# --- NEW statistics tasks (+23) ---
STAT.append(mk(
    id="stat-mean-6", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Среднее арифметическое", difficulty="easy",
    statement="Найдите среднее арифметическое чисел 10, 14, 18, 22, 26, 30.",
    answer=20, tolerance=0.001,
    hint1="Сложить и поделить.",
    hint2="Сумма арифметической прогрессии = 6 слагаемых, крайние 10 и 30.",
    hint3="Сумма = $6 \\cdot (10+30)/2 = 120$. Среднее = $120/6 = 20$.",
    solution=["Сумма = $(10+30) \\cdot 6/2 = 120$.", "Среднее = $120/6 = 20$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-weighted-mean", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Взвешенное среднее", difficulty="medium",
    statement="Студент получил оценки: по математике — 5, по физике — 4, по химии — 3. Весовые коэффициенты: 3, 2 и 1 соответственно. Найдите взвешенное среднее.",
    answer=26/6, tolerance=0.01,
    hint1="Взвешенное среднее: $\\bar x = \\dfrac{\\sum x_i w_i}{\\sum w_i}$.",
    hint2="Числитель: $5 \\cdot 3 + 4 \\cdot 2 + 3 \\cdot 1 = 26$.",
    hint3="Знаменатель: $3+2+1 = 6$. $\\bar x = 26/6 \\approx 4{,}33$.",
    solution=["Числитель: $15 + 8 + 3 = 26$.", "Знаменатель: 6.", "$\\bar x = 26/6 \\approx 4{,}33$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-median-even", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Медиана", difficulty="medium",
    statement="Найдите медиану ряда: 2, 4, 5, 7, 8, 10.",
    answer=6, tolerance=0.001,
    hint1="В ряду 6 чисел, медиана — среднее двух центральных.",
    hint2="Центральные: 5 и 7.",
    hint3="Медиана = $(5+7)/2 = 6$.",
    solution=["Ряд уже упорядочен.", "Центральные: 5 и 7.", "Медиана = $(5+7)/2 = 6$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-two-medians", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Медиана", difficulty="medium",
    statement="В наборе 8 чисел после упорядочивания получили: 1, 3, 5, 7, 9, 11, 13, 15. Найдите медиану.",
    answer=8, tolerance=0.001,
    hint1="Чётное количество — среднее двух центральных.",
    hint2="Центральные: 4-й и 5-й, то есть 7 и 9.",
    hint3="$(7+9)/2 = 8$.",
    solution=["Центральные: 7 и 9.", "Медиана = 8."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-range-2", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Размах", difficulty="easy",
    statement="В классе измерили рост учеников (в см): 155, 162, 148, 175, 168, 170, 155. Найдите размах.",
    answer=27, tolerance=0.001,
    hint1="max - min.",
    hint2="max = 175, min = 148.",
    hint3="$175 - 148 = 27$.",
    solution=["max = 175, min = 148.", "$R = 27$."],
    related=["hb-statistics-spread"],
))
STAT.append(mk(
    id="stat-variance-simple", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Дисперсия", difficulty="hard",
    statement="Найдите дисперсию ряда: 2, 4, 4, 4, 5, 5, 7, 9. Дайте ответ с точностью до сотых.",
    answer=4, tolerance=0.01,
    hint1="Сначала найдите среднее: $\\bar x = 5$.",
    hint2="Дисперсия: среднее квадратов отклонений от среднего.",
    hint3="Отклонения: $(-3)^2, (-1)^2, (-1)^2, (-1)^2, 0^2, 0^2, 2^2, 4^2 = 9,1,1,1,0,0,4,16$. Сумма = 32. $D = 32/8 = 4$.",
    solution=[
        "$\\bar x = (2+4+4+4+5+5+7+9)/8 = 40/8 = 5$.",
        "Сумма квадратов отклонений: $9+1+1+1+0+0+4+16 = 32$.",
        "$D = 32/8 = 4$.",
    ],
    related=["hb-statistics-spread"],
))
STAT.append(mk(
    id="stat-percentage-sale", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Проценты и доли", difficulty="easy",
    statement="Магазин продал 120 единиц товара, из которых 30 были со скидкой. Какой процент товара был продан со скидкой?",
    answer=25, tolerance=0.01,
    hint1="Доля * 100%.",
    hint2="$30/120 \\cdot 100\\%$.",
    hint3="$30/120 = 0{,}25 = 25\\%$.",
    solution=["$30/120 = 0{,}25$.", "$0{,}25 \\cdot 100\\% = 25\\%$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-bar-chart", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Чтение диаграмм", difficulty="easy",
    statement="На диаграмме показано количество проданных товаров по дням: пн — 40, вт — 60, ср — 50, чт — 30, пт — 70. Во сколько раз в пятницу продали больше, чем в четверг?",
    answer=70/30, tolerance=0.01,
    hint1="Поделите пятницу на четверг.",
    hint2="$70/30$.",
    hint3="$70/30 = 7/3 \\approx 2{,}33$.",
    solution=["$70/30 = 7/3 \\approx 2{,}33$."],
    related=["hb-statistics-graphs"],
))
STAT.append(mk(
    id="stat-average-chart", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Чтение диаграмм", difficulty="medium",
    statement="За 5 дней недели в магазине продали 40, 60, 50, 30, 70 товаров. Найдите среднесуточные продажи.",
    answer=50, tolerance=0.01,
    hint1="Сумма/количество.",
    hint2="Сумма: $40+60+50+30+70 = 250$.",
    hint3="Среднесуточная: $250/5 = 50$.",
    solution=["Сумма = 250.", "$250/5 = 50$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-weight-kg", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Среднее", difficulty="medium",
    statement="В группе 10 человек, средний вес 65 кг. Пришёл ещё один человек — суммарный средний вес стал 66 кг. Сколько весил пришедший?",
    answer=76, tolerance=1,
    hint1="Сумма до: $10 \\cdot 65$.",
    hint2="Сумма после: $11 \\cdot 66$.",
    hint3="Разница: $726 - 650 = 76$ кг.",
    solution=["$S_{10} = 650$.", "$S_{11} = 726$.", "$w = 76$ кг."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-relative-frequency", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Частота и доля", difficulty="medium",
    statement="Проведено 200 бросаний монеты, орёл выпал 107 раз. Найдите относительную частоту выпадения орла. Дайте ответ в виде десятичной дроби.",
    answer=0.535, tolerance=0.001,
    hint1="Относительная частота = выпадения/всего.",
    hint2="$107/200$.",
    hint3="$107/200 = 0{,}535$.",
    solution=["$107/200 = 0{,}535$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-price-increase", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Проценты", difficulty="medium",
    statement="Цена товара выросла с 450 до 540 рублей. На сколько процентов выросла цена?",
    answer=20, tolerance=0.1,
    hint1="$(\\text{новая} - \\text{старая})/\\text{старая} \\cdot 100\\%$.",
    hint2="$(540 - 450)/450 = 90/450$.",
    hint3="$90/450 = 0{,}2 = 20\\%$.",
    solution=["Изменение = $540-450 = 90$.", "$90/450 = 0{,}2 = 20\\%$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-student-scores", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Частота", difficulty="medium",
    statement="В школе 400 учеников. На ЕГЭ 120 получили от 80 баллов и выше. Какую долю составляют высокобалльники?",
    answer=0.3, tolerance=0.001,
    hint1="Доля = часть/целое.",
    hint2="$120/400$.",
    hint3="$120/400 = 0{,}3$.",
    solution=["$120/400 = 0{,}3$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-pie-slice", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Чтение диаграмм", difficulty="medium",
    statement="В круговой диаграмме сектору 'Математика' соответствует угол 144°. Какой процент всех учеников выбрали математику?",
    answer=40, tolerance=0.1,
    hint1="Полный круг — 360°, что равно 100%.",
    hint2="$144/360 \\cdot 100\\%$.",
    hint3="$144/360 = 0{,}4 = 40\\%$.",
    solution=["$144/360 = 0{,}4 = 40\\%$."],
    related=["hb-statistics-graphs"],
))
STAT.append(mk(
    id="stat-median-10", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Медиана", difficulty="medium",
    statement="Найдите медиану ряда: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19.",
    answer=10, tolerance=0.001,
    hint1="10 чисел — чётное, медиана = среднее двух центральных.",
    hint2="Центральные: 5-й и 6-й, то есть 9 и 11.",
    hint3="Медиана = $(9+11)/2 = 10$.",
    solution=["Ряд упорядочен.", "Центральные: 9 и 11.", "Медиана = 10."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-two-averages", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Среднее", difficulty="hard",
    statement="В первой группе 10 человек со средним ростом 170 см. Во второй группе 15 человек со средним ростом 180 см. Найдите средний рост всех 25 человек.",
    answer=176, tolerance=0.1,
    hint1="Найдите суммарный рост в каждой группе.",
    hint2="Суммы: $10 \\cdot 170 = 1700$ и $15 \\cdot 180 = 2700$.",
    hint3="Всего: $(1700+2700)/25 = 4400/25 = 176$.",
    solution=["Сумма: $1700 + 2700 = 4400$.", "Средний: $4400/25 = 176$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-temperature-deviation", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Отклонения", difficulty="medium",
    statement="В течение 5 дней температура была 10, 12, 11, 13, 9. На сколько градусов самая высокая температура отличается от средней?",
    answer=2, tolerance=0.1,
    hint1="Средняя: сложить и поделить на 5.",
    hint2="Средняя: $(10+12+11+13+9)/5 = 55/5 = 11$.",
    hint3="Максимум = 13. Отклонение = $13 - 11 = 2$.",
    solution=["Средняя: 11.", "Максимум: 13.", "Разность: 2."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-sample-size", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Частота", difficulty="easy",
    statement="В выборке из 80 деталей оказалось 4 бракованных. Найдите относительную частоту брака в виде десятичной дроби.",
    answer=0.05, tolerance=0.001,
    hint1="Брак/всего.",
    hint2="$4/80$.",
    hint3="$4/80 = 0{,}05$.",
    solution=["$4/80 = 0{,}05$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-discount", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Проценты", difficulty="easy",
    statement="Товар стоил 800 рублей. После скидки он стоит 640 рублей. Какой процент составляет скидка?",
    answer=20, tolerance=0.1,
    hint1="Скидка в рублях: 800-640.",
    hint2="Относительно исходной цены.",
    hint3="$160/800 = 0{,}2 = 20\\%$.",
    solution=["Скидка: $800-640 = 160$.", "$160/800 = 20\\%$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-population-growth", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Проценты", difficulty="medium",
    statement="Население города в 2020 году было 120 000 человек. К 2023 году оно выросло на 5%. Сколько человек стало в городе в 2023 году?",
    answer=126000, tolerance=1,
    hint1="Коэффициент роста: 1,05.",
    hint2="Умножить на 1,05.",
    hint3="$120000 \\cdot 1{,}05 = 126000$.",
    solution=["$120000 \\cdot 1{,}05 = 126000$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-class-grades", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Среднее", difficulty="medium",
    statement="В классе 20 учеников написали контрольную. 5 получили «5», 8 — «4», 5 — «3», 2 — «2». Найдите средний балл.",
    answer=3.8, tolerance=0.01,
    hint1="Взвешенное среднее.",
    hint2="$\\bar x = (5 \\cdot 5 + 4 \\cdot 8 + 3 \\cdot 5 + 2 \\cdot 2)/20$.",
    hint3="$\\bar x = (25+32+15+4)/20 = 76/20 = 3{,}8$.",
    solution=["$\\bar x = (25+32+15+4)/20 = 76/20 = 3{,}8$."],
    related=["hb-statistics-averages"],
))
STAT.append(mk(
    id="stat-midrange", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Средние и экстремумы", difficulty="easy",
    statement="В ряду чисел 12, 19, 8, 25, 14, 17 найдите размах.",
    answer=17, tolerance=0.001,
    hint1="max - min.",
    hint2="max = 25, min = 8.",
    hint3="$25 - 8 = 17$.",
    solution=["max = 25, min = 8.", "$R = 17$."],
    related=["hb-statistics-spread"],
))
STAT.append(mk(
    id="stat-hist-reading", topic="statistics", examNumber=9, examLevel="база",
    subtopic="Чтение диаграмм", difficulty="medium",
    statement="По данным столбчатой диаграммы продаж: январь 10, февраль 15, март 20, апрель 25 тысяч штук. На сколько процентов апрель больше января?",
    answer=150, tolerance=0.5,
    hint1="Рост = (новое - старое)/старое * 100%.",
    hint2="$(25-10)/10 \\cdot 100\\%$.",
    hint3="$15/10 = 1{,}5 = 150\\%$.",
    solution=["Рост = $(25-10)/10 = 1{,}5 = 150\\%$."],
    related=["hb-statistics-graphs"],
))

# ===========================================================================
# ECONOMICS — aim for ~30
# ===========================================================================
ECON = []

ECON.append(mk(
    id="econ-deposit-compound", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Вклад со сложным процентом", difficulty="easy",
    statement="1 января 2020 года вкладчик положил в банк 200 000 рублей под 10% годовых с ежегодной капитализацией процентов. Сколько рублей будет на счёте 1 января 2023 года?",
    answer=266200, tolerance=1,
    hint1="Каждый год сумма умножается на $(1+r)$.",
    hint2="$S_n = S_0 \\cdot (1+r)^n$.",
    hint3="$S = 200000 \\cdot 1{,}1^3 = 266\\,200$.",
    solution=["$1{,}1^3 = 1{,}331$.", "$S = 200000 \\cdot 1{,}331 = 266200$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-differential-overpay", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Дифференцированные платежи", difficulty="hard",
    statement="Иван взял кредит 7,2 млн руб. на 8 месяцев по дифференцированной схеме под 2% в месяц. Каждый месяц долг уменьшается на одну и ту же сумму. Найдите переплату.",
    answer=648000, tolerance=1,
    hint1="Долг каждого месяца: 7,2; 6,3; ...; 0,9 (млн).",
    hint2="Переплата = сумма процентов за каждый месяц.",
    hint3="Сумма долгов = $7{,}2 + 6{,}3 + ... + 0{,}9 = 32{,}4$. Переплата = $32{,}4 \\cdot 0{,}02 = 0{,}648$ млн = 648 000.",
    solution=["Сумма остатков: $(7{,}2+0{,}9) \\cdot 8/2 = 32{,}4$ млн.", "Переплата: $32{,}4 \\cdot 0{,}02 \\cdot 10^6 = 648\\,000$."],
    related=["hb-economics-credit-differential"],
))
ECON.append(mk(
    id="econ-annuity-payment", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Аннуитетный платёж", difficulty="hard",
    statement="1 января 2020 года Иван взял в банке 1 000 000 рублей под 10% в месяц на 4 месяца с аннуитетной схемой (равные ежемесячные платежи, к концу 4-го месяца долг погашен). Найдите ежемесячный платёж. Ответ округлите до целого.",
    answer=315471, tolerance=2,
    hint1="Аннуитетное уравнение: $S \\cdot q^n = x \\cdot (q^n - 1)/(q - 1)$.",
    hint2="$q = 1{,}1$, $q^4 = 1{,}4641$.",
    hint3="$x = 10^6 \\cdot 1{,}4641 \\cdot 0{,}1/0{,}4641 \\approx 315\\,471$.",
    solution=["$q = 1{,}1$, $q^4 = 1{,}4641$.", "$x = S q^n (q-1)/(q^n - 1) \\approx 315\\,471$."],
    related=["hb-economics-credit-annuity"],
))
ECON.append(mk(
    id="econ-quadratic-profit", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Оптимизация", difficulty="hard",
    statement="Прибыль зависит от количества выпущенной продукции $x$ по формуле $f(x) = -x^2 + 60x - 500$. Найдите максимальную прибыль.",
    answer=400, tolerance=0.001,
    hint1="Максимум квадратичной функции в вершине.",
    hint2="$x_0 = 30$.",
    hint3="$f(30) = -900 + 1800 - 500 = 400$.",
    solution=["Вершина: $x_0 = 60/2 = 30$.", "$f(30) = -900 + 1800 - 500 = 400$."],
    related=["hb-economics-optimization"],
))
ECON.append(mk(
    id="econ-deposit-monthly", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Сложный процент с пополнением", difficulty="medium",
    statement="Вкладчик открыл вклад на 100 000 руб. под 10% годовых. Каждый год в конце года он докладывает 50 000 руб. Сколько рублей будет на счёте через 2 года? (капитализация ежегодная, пополнение — после начисления процентов)",
    answer=226000, tolerance=1,
    hint1="За первый год: 100000 * 1,1 + 50000.",
    hint2="За второй год: от полученной суммы снова * 1,1 + 50000.",
    hint3="$S_1 = 160000$, $S_2 = 160000 \\cdot 1{,}1 + 50000 = 226000$.",
    solution=["Год 1: $100000 \\cdot 1{,}1 + 50000 = 160000$.", "Год 2: $160000 \\cdot 1{,}1 + 50000 = 226000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-credit-table", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Кредит по таблице долгов", difficulty="hard",
    statement="В январе каждого из 3 лет банк начисляет 30% на сумму долга. В феврале клиент вносит сумму. В начале 1-го года долг 1 млн. После платежей остатки становятся: после 1-го года — 0,6 млн; после 2-го — 0,3 млн; после 3-го — 0. Найдите суммарный внесённый платёж. Ответ в млн руб.",
    answer=1.57, tolerance=0.005,
    hint1="Каждый год долг растёт на 30%, затем вычитают платёж.",
    hint2="$\\text{платёж}_k = 1{,}3 \\cdot D_{k-1} - D_k$.",
    hint3="Платёжи: $1{,}3-0{,}6 = 0{,}7$; $0{,}78-0{,}3 = 0{,}48$; $0{,}39-0 = 0{,}39$. Сумма: $0{,}7+0{,}48+0{,}39 = 1{,}57$.",
    solution=[
        "Платёж 1: $1{,}3 \\cdot 1 - 0{,}6 = 0{,}7$.",
        "Платёж 2: $1{,}3 \\cdot 0{,}6 - 0{,}3 = 0{,}48$.",
        "Платёж 3: $1{,}3 \\cdot 0{,}3 - 0 = 0{,}39$.",
        "Сумма: $0{,}7 + 0{,}48 + 0{,}39 = 1{,}57$ млн.",
    ],
    related=["hb-economics-credit-differential"],
))
ECON.append(mk(
    id="econ-deposit-monthly-cap", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Вклад с ежемесячной капитализацией", difficulty="medium",
    statement="Вкладчик положил 100 000 рублей под 12% годовых с ежемесячной капитализацией (каждый месяц прибавляется $1\\%$ от текущей суммы). Какая сумма будет через 2 месяца? Округлите до целого.",
    answer=102010, tolerance=1,
    hint1="Месячная ставка: 1%.",
    hint2="$S = 100000 \\cdot 1{,}01^n$.",
    hint3="$S = 100000 \\cdot 1{,}0201 = 102010$.",
    solution=["$1{,}01^2 = 1{,}0201$.", "$S = 102010$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-loan-simple", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Простой кредит", difficulty="medium",
    statement="Иван взял 600 000 руб. под 20% годовых на 1 год. Сколько рублей он переплатит банку, если погасит кредит одним платежом в конце срока?",
    answer=120000, tolerance=1,
    hint1="Долг к концу года: $S \\cdot 1{,}2$.",
    hint2="Переплата = $S \\cdot 1{,}2 - S = S \\cdot 0{,}2$.",
    hint3="$600000 \\cdot 0{,}2 = 120000$.",
    solution=["Долг: $720000$.", "Переплата: $120000$."],
    related=["hb-economics-deposits"],
))

# --- NEW economics (+22) ---
ECON.append(mk(
    id="econ-deposit-4y", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Вклад со сложным процентом", difficulty="easy",
    statement="Вкладчик положил 50 000 рублей под 8% годовых с ежегодной капитализацией. Сколько рублей будет на счёте через 2 года? Ответ округлите до целого.",
    answer=58320, tolerance=1,
    hint1="$S_n = S_0 (1+r)^n$.",
    hint2="$1{,}08^2 = 1{,}1664$.",
    hint3="$S = 50000 \\cdot 1{,}1664 = 58320$.",
    solution=["$S = 50000 \\cdot 1{,}1664 = 58320$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-deposit-5y", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Вклад со сложным процентом", difficulty="medium",
    statement="В банке открыли вклад 400 000 руб. под 15% годовых на 2 года. Сколько рублей будет на счёте в конце срока? Ответ округлите до целого.",
    answer=529000, tolerance=1,
    hint1="$S = 400000 \\cdot 1{,}15^2$.",
    hint2="$1{,}15^2 = 1{,}3225$.",
    hint3="$S = 400000 \\cdot 1{,}3225 = 529\\,000$.",
    solution=["$S = 400000 \\cdot 1{,}3225 = 529000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-loan-year-half", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Простой кредит", difficulty="medium",
    statement="Кредит 300 000 руб. под 12% годовых на 6 месяцев с единовременным возвратом. Сколько составит переплата?",
    answer=18000, tolerance=1,
    hint1="За полгода ставка 6%.",
    hint2="$300000 \\cdot 0{,}06$.",
    hint3="Переплата = $18\\,000$.",
    solution=["Ставка за 6 мес = 6%.", "Переплата = $300000 \\cdot 0{,}06 = 18000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-markup", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Наценка и скидка", difficulty="easy",
    statement="Магазин закупил товар по 400 рублей и продаёт с наценкой 35%. По какой цене магазин продаёт товар?",
    answer=540, tolerance=0.1,
    hint1="Наценка добавляется к цене.",
    hint2="Новая цена = $400 \\cdot 1{,}35$.",
    hint3="$400 \\cdot 1{,}35 = 540$.",
    solution=["$400 \\cdot 1{,}35 = 540$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-discount-sequential", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Наценка и скидка", difficulty="medium",
    statement="Товар стоил 1000 рублей. Сначала цену подняли на 20%, затем снизили на 20%. Какая стала конечная цена?",
    answer=960, tolerance=0.1,
    hint1="Коэффициенты $1{,}2$ и $0{,}8$.",
    hint2="Перемножить.",
    hint3="$1000 \\cdot 1{,}2 \\cdot 0{,}8 = 960$.",
    solution=["$1000 \\cdot 1{,}2 = 1200$.", "$1200 \\cdot 0{,}8 = 960$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-inflation-2y", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Инфляция", difficulty="medium",
    statement="Цена хлеба растёт на 8% ежегодно. Сейчас буханка стоит 50 рублей. Сколько она будет стоить через 3 года? Ответ округлите до целого.",
    answer=63, tolerance=1,
    hint1="$50 \\cdot 1{,}08^3$.",
    hint2="$1{,}08^3 \\approx 1{,}2597$.",
    hint3="$50 \\cdot 1{,}2597 \\approx 63$.",
    solution=["$1{,}08^3 = 1{,}2597$.", "$50 \\cdot 1{,}2597 \\approx 63$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-goal-save", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Накопительный вклад", difficulty="hard",
    statement="Чтобы накопить 605 000 рублей под 10% годовых (капитализация ежегодная), сколько нужно положить сейчас? Срок — 2 года. Ответ округлите до целого.",
    answer=500000, tolerance=1,
    hint1="$S_n = S_0 (1+r)^n$.",
    hint2="$S_0 = S_n / (1+r)^n$.",
    hint3="$S_0 = 605000 / 1{,}21 = 500\\,000$.",
    solution=["$1{,}1^2 = 1{,}21$.", "$S_0 = 605000/1{,}21 = 500000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-diff-3", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Дифференцированные платежи", difficulty="hard",
    statement="Кредит 900 000 руб. на 3 месяца под 5% в месяц с дифференцированными платежами (долг уменьшается каждый месяц на одну и ту же сумму). Найдите сумму переплаты в рублях.",
    answer=90000, tolerance=1,
    hint1="Долги: 900, 600, 300 тыс.",
    hint2="Проценты: $900 \\cdot 0{,}05 + 600 \\cdot 0{,}05 + 300 \\cdot 0{,}05 = 1800 \\cdot 0{,}05$ тыс.",
    hint3="$1800 \\cdot 0{,}05 = 90$ тыс = 90 000 руб.",
    solution=["Сумма долгов: $900 + 600 + 300 = 1800$ тыс.", "$0{,}05 \\cdot 1800 = 90$ тыс = $90000$."],
    related=["hb-economics-credit-differential"],
))
ECON.append(mk(
    id="econ-annuity-2m", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Аннуитетный платёж", difficulty="hard",
    statement="Кредит 100 000 рублей на 2 месяца под 10% в месяц с аннуитетной схемой. Найдите ежемесячный платёж в рублях. Округлите до целого.",
    answer=57619, tolerance=2,
    hint1="$x = S q^n (q-1)/(q^n - 1)$.",
    hint2="$q^2 = 1{,}21$.",
    hint3="$x = 100000 \\cdot 1{,}21 \\cdot 0{,}1/0{,}21 \\approx 57619$.",
    solution=["$q^n = 1{,}21$.", "$x = 100000 \\cdot 1{,}21 \\cdot 0{,}1/0{,}21 \\approx 57619$."],
    related=["hb-economics-credit-annuity"],
))
ECON.append(mk(
    id="econ-markup-loss", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Цена и процент", difficulty="medium",
    statement="После двух повышений цены на 10% каждое, товар стоит 1452 рубля. Сколько он стоил изначально?",
    answer=1200, tolerance=0.1,
    hint1="$S \\cdot 1{,}1^2 = 1452$.",
    hint2="$S = 1452/1{,}21$.",
    hint3="$S = 1200$.",
    solution=["$1{,}1^2 = 1{,}21$.", "$S = 1452/1{,}21 = 1200$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-tax-net", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Налоги", difficulty="medium",
    statement="Зарплата до налогов 50 000 рублей. Ставка НДФЛ 13%. Сколько рублей получит на руки сотрудник?",
    answer=43500, tolerance=0.5,
    hint1="Налог = 13% от зарплаты.",
    hint2="На руки = $50000 \\cdot 0{,}87$.",
    hint3="$50000 \\cdot 0{,}87 = 43500$.",
    solution=["$50000 \\cdot 0{,}87 = 43500$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-salary-increase", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Проценты", difficulty="medium",
    statement="Зарплату повысили на 20%, и она стала 60 000 рублей. Какая была зарплата до повышения?",
    answer=50000, tolerance=1,
    hint1="$S \\cdot 1{,}2 = 60000$.",
    hint2="$S = 60000/1{,}2$.",
    hint3="$S = 50000$.",
    solution=["$S = 60000/1{,}2 = 50000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-quad-max-price", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Оптимизация", difficulty="hard",
    statement="Спрос на товар задан функцией $q(p) = 100 - 2p$ (единиц при цене $p$ руб.). Выручка $R(p) = p \\cdot q(p)$. Найдите максимальное значение выручки.",
    answer=1250, tolerance=0.5,
    hint1="$R(p) = 100p - 2p^2$.",
    hint2="Вершина в $p_0 = 100/4 = 25$.",
    hint3="$R(25) = 2500 - 1250 = 1250$.",
    solution=["$R(p) = 100p - 2p^2$.", "$p_0 = 25$, $R(25) = 1250$."],
    related=["hb-economics-optimization"],
))
ECON.append(mk(
    id="econ-quad-min-cost", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Оптимизация", difficulty="hard",
    statement="Суммарные затраты на выпуск $x$ единиц: $C(x) = x^2 - 40x + 500$. При каком $x$ затраты минимальны и чему равны?",
    answer=100, tolerance=0.5,
    hint1="Минимум квадратичной функции в вершине.",
    hint2="$x_0 = 40/2 = 20$.",
    hint3="$C(20) = 400 - 800 + 500 = 100$.",
    solution=["$x_0 = 20$.", "$C(20) = 100$."],
    related=["hb-economics-optimization"],
))
ECON.append(mk(
    id="econ-break-even", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Точка безубыточности", difficulty="medium",
    statement="Постоянные издержки фирмы 10 000 руб./мес. Переменные издержки на единицу — 50 руб., цена продажи — 150 руб. Сколько единиц нужно продать за месяц, чтобы не быть в убытке?",
    answer=100, tolerance=0.5,
    hint1="Выручка = издержки.",
    hint2="$150x = 10000 + 50x$.",
    hint3="$100x = 10000$, $x = 100$.",
    solution=["$150x = 10000 + 50x$.", "$x = 100$."],
    related=["hb-economics-optimization"],
))
ECON.append(mk(
    id="econ-interest-diff", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Сравнение вкладов", difficulty="hard",
    statement="Вклад A: 100 000 руб. под 10% годовых с ежегодной капитализацией на 2 года. Вклад B: простые проценты 11% на 2 года. Насколько вклад A больше вклада B? Ответ в рублях.",
    answer=-1000, tolerance=1,
    hint1="Вклад A: $100000 \\cdot 1{,}1^2 = 121000$.",
    hint2="Вклад B: $100000 \\cdot (1 + 2 \\cdot 0{,}11) = 122000$.",
    hint3="Разность: $A - B = 121000 - 122000 = -1000$, т.е. A меньше на 1000.",
    solution=["A: $100000 \\cdot 1{,}21 = 121000$.", "B: $100000 \\cdot 1{,}22 = 122000$.", "$A - B = -1000$."],
    related=["hb-economics-strategy"],
))
ECON.append(mk(
    id="econ-annuity-6m", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Аннуитетный платёж", difficulty="hard",
    statement="Кредит 500 000 руб. на 3 месяца под 5% в месяц с аннуитетной схемой. Найдите ежемесячный платёж. Округлите до целого.",
    answer=183602, tolerance=3,
    hint1="$x = S q^n (q-1)/(q^n - 1)$.",
    hint2="$q = 1{,}05$, $q^3 = 1{,}157625$.",
    hint3="$x = 500000 \\cdot 1{,}157625 \\cdot 0{,}05 / 0{,}157625 \\approx 183\\,602$.",
    solution=["$q^3 = 1{,}157625$.", "$x \\approx 500000 \\cdot 1{,}157625 \\cdot 0{,}05/0{,}157625 \\approx 183602$."],
    related=["hb-economics-credit-annuity"],
))
ECON.append(mk(
    id="econ-interest-monthly-compare", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Сравнение вкладов", difficulty="hard",
    statement="Во сколько раз увеличится вклад за 1 год под 12% годовых с ежемесячной капитализацией? Ответ округлите до сотых.",
    answer=1.1268, tolerance=0.001,
    hint1="Месячная ставка 1%, $n = 12$.",
    hint2="$k = 1{,}01^{12}$.",
    hint3="$1{,}01^{12} \\approx 1{,}1268$.",
    solution=["$1{,}01^{12} \\approx 1{,}1268$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-fund-grow", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Накопительный вклад", difficulty="hard",
    statement="В конце каждого из 3 лет на счёт вкладывают по 100 000 рублей. На всю сумму в конце года начисляются 10% годовых. Сколько будет на счёте через 3 года? (взносы делаются после капитализации)",
    answer=331000, tolerance=1,
    hint1="Каждый взнос растёт разное количество лет.",
    hint2="Первый взнос растёт 2 года, второй — 1 год, третий — 0.",
    hint3="$100000 \\cdot (1{,}1^2 + 1{,}1 + 1) = 100000 \\cdot 3{,}31 = 331000$.",
    solution=["$1{,}1^2 + 1{,}1 + 1 = 1{,}21+1{,}1+1 = 3{,}31$.", "$100000 \\cdot 3{,}31 = 331000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-final-after-fall", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Проценты", difficulty="medium",
    statement="Акции подорожали на 25%, а затем подешевели на 20%. На сколько процентов изменилась исходная цена?",
    answer=0, tolerance=0.5,
    hint1="Коэффициенты $1{,}25$ и $0{,}8$.",
    hint2="Перемножить.",
    hint3="$1{,}25 \\cdot 0{,}8 = 1$. Изменение на 0%.",
    solution=["$1{,}25 \\cdot 0{,}8 = 1$.", "Изменения нет, 0%."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-invest-shares", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Инвестиции", difficulty="medium",
    statement="Инвестор вложил 200 000 руб. в две акции: A — 60%, B — 40%. Акция A выросла на 30%, B упала на 10%. Найдите стоимость портфеля в рублях.",
    answer=228000, tolerance=1,
    hint1="A = $120000 \\cdot 1{,}3$. B = $80000 \\cdot 0{,}9$.",
    hint2="Суммировать.",
    hint3="$156000 + 72000 = 228000$.",
    solution=["A: $120000 \\cdot 1{,}3 = 156000$.", "B: $80000 \\cdot 0{,}9 = 72000$.", "Итого: $228000$."],
    related=["hb-economics-deposits"],
))
ECON.append(mk(
    id="econ-double-years", topic="economics", examNumber=16, examLevel="профиль",
    subtopic="Накопление", difficulty="hard",
    statement="Через сколько лет сумма удвоится при ставке 20% годовых (ежегодная капитализация)? Дайте наименьшее целое число лет, при котором сумма точно удвоилась.",
    answer=4, tolerance=0.5,
    hint1="$1{,}2^n \\ge 2$.",
    hint2="$1{,}2^3 = 1{,}728$, $1{,}2^4 = 2{,}0736$.",
    hint3="Наименьшее целое $n = 4$.",
    solution=["$1{,}2^3 = 1{,}728 < 2$.", "$1{,}2^4 = 2{,}07 \\ge 2$.", "$n = 4$."],
    related=["hb-economics-deposits"],
))

# ===========================================================================
# GEOMETRY — new topic, ~30 tasks
# ===========================================================================
GEOM = []

# Planimetry (№1 profile / база)
GEOM.append(mk(
    id="geom-right-hypot", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Теорема Пифагора", difficulty="easy",
    statement="В прямоугольном треугольнике катеты равны 3 и 4. Найдите гипотенузу.",
    answer=5, tolerance=0.01,
    hint1="Теорема Пифагора: $c^2 = a^2 + b^2$.",
    hint2="$c^2 = 9 + 16 = 25$.",
    hint3="$c = 5$.",
    solution=["$c^2 = 3^2 + 4^2 = 25$.", "$c = 5$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-right-leg", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Теорема Пифагора", difficulty="easy",
    statement="В прямоугольном треугольнике гипотенуза равна 13, один из катетов — 5. Найдите второй катет.",
    answer=12, tolerance=0.01,
    hint1="$b^2 = c^2 - a^2$.",
    hint2="$b^2 = 169 - 25 = 144$.",
    hint3="$b = 12$.",
    solution=["$b^2 = 13^2 - 5^2 = 169 - 25 = 144$.", "$b = 12$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-triangle-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь треугольника", difficulty="easy",
    statement="Основание треугольника 10, высота к этому основанию 6. Найдите его площадь.",
    answer=30, tolerance=0.01,
    hint1="$S = \\dfrac{1}{2} a h$.",
    hint2="$S = 0{,}5 \\cdot 10 \\cdot 6$.",
    hint3="$S = 30$.",
    solution=["$S = 0{,}5 \\cdot 10 \\cdot 6 = 30$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-right-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь треугольника", difficulty="easy",
    statement="В прямоугольном треугольнике катеты равны 6 и 8. Найдите площадь.",
    answer=24, tolerance=0.01,
    hint1="$S = \\dfrac{1}{2} a b$ (для прямоугольного).",
    hint2="$S = 0{,}5 \\cdot 6 \\cdot 8$.",
    hint3="$S = 24$.",
    solution=["$S = 0{,}5 \\cdot 6 \\cdot 8 = 24$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-triangle-heron", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Формула Герона", difficulty="medium",
    statement="Стороны треугольника равны 13, 14, 15. Найдите его площадь.",
    answer=84, tolerance=0.1,
    hint1="Формула Герона: $S = \\sqrt{p(p-a)(p-b)(p-c)}$, $p$ — полупериметр.",
    hint2="$p = (13+14+15)/2 = 21$.",
    hint3="$S = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.",
    solution=["$p = 21$.", "$S^2 = 21 \\cdot 8 \\cdot 7 \\cdot 6 = 7056$.", "$S = 84$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-parallelogram-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь параллелограмма", difficulty="easy",
    statement="У параллелограмма сторона 12, высота к ней 7. Найдите площадь.",
    answer=84, tolerance=0.01,
    hint1="$S = a h$.",
    hint2="$S = 12 \\cdot 7$.",
    hint3="$S = 84$.",
    solution=["$S = 12 \\cdot 7 = 84$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-rhombus-diags", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь ромба", difficulty="easy",
    statement="Диагонали ромба равны 10 и 24. Найдите его площадь.",
    answer=120, tolerance=0.01,
    hint1="$S = \\dfrac{1}{2} d_1 d_2$.",
    hint2="$S = 0{,}5 \\cdot 10 \\cdot 24$.",
    hint3="$S = 120$.",
    solution=["$S = (10 \\cdot 24)/2 = 120$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-trapezoid-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь трапеции", difficulty="easy",
    statement="В трапеции основания равны 6 и 10, высота — 4. Найдите площадь.",
    answer=32, tolerance=0.01,
    hint1="$S = \\dfrac{a+b}{2} h$.",
    hint2="$S = (6+10)/2 \\cdot 4 = 8 \\cdot 4$.",
    hint3="$S = 32$.",
    solution=["$S = \\dfrac{6+10}{2} \\cdot 4 = 32$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-rect-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Площадь прямоугольника", difficulty="easy",
    statement="Стороны прямоугольника 9 и 15. Найдите его площадь.",
    answer=135, tolerance=0.01,
    hint1="$S = a b$.",
    hint2="$9 \\cdot 15$.",
    hint3="$S = 135$.",
    solution=["$S = 9 \\cdot 15 = 135$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-square-diagonal", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Диагональ квадрата", difficulty="easy",
    statement="Сторона квадрата равна 5. Найдите его диагональ. Ответ округлите до сотых.",
    answer=7.07, tolerance=0.02,
    hint1="Диагональ квадрата: $d = a \\sqrt{2}$.",
    hint2="$d = 5\\sqrt{2}$.",
    hint3="$\\sqrt{2} \\approx 1{,}414$; $5 \\cdot 1{,}414 = 7{,}07$.",
    solution=["$d = a\\sqrt{2} = 5\\sqrt{2} \\approx 7{,}07$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-circle-area", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Круг: площадь", difficulty="easy",
    statement="Радиус круга равен 5. Найдите площадь круга. Ответ через $\\pi$: укажите коэффициент перед $\\pi$.",
    answer=25, tolerance=0.01,
    hint1="$S = \\pi r^2$.",
    hint2="$r^2 = 25$.",
    hint3="$S = 25\\pi$; коэффициент = 25.",
    solution=["$S = \\pi \\cdot 25$.", "Коэффициент = 25."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-circle-circumference", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Круг: длина", difficulty="easy",
    statement="Найдите длину окружности радиуса 7. Ответ укажите как коэффициент перед $\\pi$.",
    answer=14, tolerance=0.01,
    hint1="$L = 2\\pi r$.",
    hint2="Коэффициент перед $\\pi$: $2r$.",
    hint3="$2 \\cdot 7 = 14$.",
    solution=["$L = 2\\pi \\cdot 7 = 14\\pi$.", "Коэффициент = 14."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-inscribed-angle", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Вписанный угол", difficulty="medium",
    statement="Центральный угол равен 80°. Найдите вписанный угол, опирающийся на ту же дугу. Ответ в градусах.",
    answer=40, tolerance=0.5,
    hint1="Вписанный угол = половина центрального.",
    hint2="$\\alpha = \\beta/2$.",
    hint3="$40°$.",
    solution=["$\\alpha = 80/2 = 40°$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-isoceles-angle", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Равнобедренный треугольник", difficulty="medium",
    statement="В равнобедренном треугольнике угол при вершине равен 40°. Найдите каждый из углов при основании. Ответ в градусах.",
    answer=70, tolerance=0.5,
    hint1="Сумма углов треугольника 180°.",
    hint2="$(180 - 40)/2$.",
    hint3="$70°$.",
    solution=["$(180 - 40)/2 = 70°$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-30-60-90", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Прямоугольный треугольник", difficulty="medium",
    statement="В прямоугольном треугольнике острый угол равен 30°, гипотенуза равна 12. Найдите меньший катет.",
    answer=6, tolerance=0.01,
    hint1="Против 30° лежит катет, равный половине гипотенузы.",
    hint2="$a = c/2$.",
    hint3="$12/2 = 6$.",
    solution=["Катет против 30° = c/2 = 6."],
    related=["hb-geometry-planimetry"],
))

# Stereometry (№3 profile)
GEOM.append(mk(
    id="geom-cube-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Куб: объём", difficulty="easy",
    statement="Ребро куба равно 5. Найдите его объём.",
    answer=125, tolerance=0.01,
    hint1="$V = a^3$.",
    hint2="$5^3$.",
    hint3="$V = 125$.",
    solution=["$V = 5^3 = 125$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-cube-surface", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Куб: площадь поверхности", difficulty="easy",
    statement="Ребро куба равно 4. Найдите полную площадь поверхности.",
    answer=96, tolerance=0.01,
    hint1="$S = 6 a^2$.",
    hint2="$6 \\cdot 16$.",
    hint3="$S = 96$.",
    solution=["$S = 6 \\cdot 16 = 96$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-parallel-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Параллелепипед", difficulty="easy",
    statement="Измерения прямоугольного параллелепипеда 3, 4, 5. Найдите его объём.",
    answer=60, tolerance=0.01,
    hint1="$V = a b c$.",
    hint2="$3 \\cdot 4 \\cdot 5$.",
    hint3="$V = 60$.",
    solution=["$V = 3 \\cdot 4 \\cdot 5 = 60$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-prism-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Призма: объём", difficulty="medium",
    statement="Площадь основания призмы 12, высота — 7. Найдите объём.",
    answer=84, tolerance=0.01,
    hint1="$V = S_{\\text{осн}} \\cdot h$.",
    hint2="$12 \\cdot 7$.",
    hint3="$V = 84$.",
    solution=["$V = 12 \\cdot 7 = 84$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-pyramid-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Пирамида: объём", difficulty="medium",
    statement="Площадь основания пирамиды 15, высота — 6. Найдите объём.",
    answer=30, tolerance=0.01,
    hint1="$V = \\dfrac{1}{3} S_{\\text{осн}} h$.",
    hint2="$(15 \\cdot 6)/3$.",
    hint3="$V = 30$.",
    solution=["$V = (15 \\cdot 6)/3 = 30$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-cylinder-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Цилиндр: объём", difficulty="medium",
    statement="Радиус основания цилиндра 3, высота 4. Найдите объём. Ответ укажите как коэффициент перед $\\pi$.",
    answer=36, tolerance=0.01,
    hint1="$V = \\pi r^2 h$.",
    hint2="$\\pi \\cdot 9 \\cdot 4$.",
    hint3="$36\\pi$; коэффициент = 36.",
    solution=["$V = \\pi \\cdot 9 \\cdot 4 = 36\\pi$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-cone-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Конус: объём", difficulty="medium",
    statement="Радиус основания конуса 6, высота 5. Найдите объём. Ответ — коэффициент перед $\\pi$.",
    answer=60, tolerance=0.01,
    hint1="$V = \\dfrac{1}{3}\\pi r^2 h$.",
    hint2="$(36 \\cdot 5)/3 = 60$.",
    hint3="$60\\pi$; коэффициент = 60.",
    solution=["$V = (1/3) \\pi \\cdot 36 \\cdot 5 = 60\\pi$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-sphere-volume", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Шар: объём", difficulty="medium",
    statement="Радиус шара 3. Найдите объём. Ответ — коэффициент перед $\\pi$.",
    answer=36, tolerance=0.01,
    hint1="$V = \\dfrac{4}{3}\\pi r^3$.",
    hint2="$(4 \\cdot 27)/3 = 36$.",
    hint3="$V = 36\\pi$; коэффициент = 36.",
    solution=["$V = (4/3)\\pi \\cdot 27 = 36\\pi$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-sphere-surface", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Шар: площадь поверхности", difficulty="medium",
    statement="Радиус шара равен 2. Найдите площадь поверхности. Ответ — коэффициент перед $\\pi$.",
    answer=16, tolerance=0.01,
    hint1="$S = 4\\pi r^2$.",
    hint2="$4 \\cdot 4 = 16$.",
    hint3="$16\\pi$.",
    solution=["$S = 4\\pi \\cdot 4 = 16\\pi$."],
    related=["hb-geometry-stereometry"],
))
GEOM.append(mk(
    id="geom-cylinder-surface", topic="geometry", examNumber=3, examLevel="профиль",
    subtopic="Цилиндр: площадь боковой поверхности", difficulty="medium",
    statement="Радиус цилиндра 3, высота 5. Найдите площадь боковой поверхности. Ответ — коэффициент перед $\\pi$.",
    answer=30, tolerance=0.01,
    hint1="$S_{\\text{бок}} = 2\\pi r h$.",
    hint2="$2 \\cdot 3 \\cdot 5 = 30$.",
    hint3="$30\\pi$.",
    solution=["$S_{\\text{бок}} = 2\\pi \\cdot 3 \\cdot 5 = 30\\pi$."],
    related=["hb-geometry-stereometry"],
))

# Vectors (№2 profile)
GEOM.append(mk(
    id="geom-vec-length", topic="geometry", examNumber=2, examLevel="профиль",
    subtopic="Длина вектора", difficulty="easy",
    statement="Найдите длину вектора $\\vec a = (3; 4)$.",
    answer=5, tolerance=0.01,
    hint1="$|\\vec a| = \\sqrt{a_x^2 + a_y^2}$.",
    hint2="$\\sqrt{9 + 16}$.",
    hint3="$|\\vec a| = \\sqrt{25} = 5$.",
    solution=["$|\\vec a| = \\sqrt{9+16} = 5$."],
    related=["hb-geometry-vectors"],
))
GEOM.append(mk(
    id="geom-vec-dot", topic="geometry", examNumber=2, examLevel="профиль",
    subtopic="Скалярное произведение", difficulty="easy",
    statement="Найдите скалярное произведение $\\vec a \\cdot \\vec b$, если $\\vec a = (1; 2)$, $\\vec b = (3; 4)$.",
    answer=11, tolerance=0.01,
    hint1="$\\vec a \\cdot \\vec b = a_x b_x + a_y b_y$.",
    hint2="$1 \\cdot 3 + 2 \\cdot 4$.",
    hint3="$3 + 8 = 11$.",
    solution=["$\\vec a \\cdot \\vec b = 3 + 8 = 11$."],
    related=["hb-geometry-vectors"],
))
GEOM.append(mk(
    id="geom-vec-angle-cos", topic="geometry", examNumber=2, examLevel="профиль",
    subtopic="Угол между векторами", difficulty="medium",
    statement="Найдите косинус угла между векторами $\\vec a = (1; 0)$ и $\\vec b = (1; 1)$. Ответ округлите до сотых.",
    answer=0.71, tolerance=0.01,
    hint1="$\\cos \\varphi = \\dfrac{\\vec a \\cdot \\vec b}{|\\vec a||\\vec b|}$.",
    hint2="$\\vec a \\cdot \\vec b = 1$, $|\\vec a| = 1$, $|\\vec b| = \\sqrt 2$.",
    hint3="$\\cos \\varphi = 1/\\sqrt 2 \\approx 0{,}71$.",
    solution=["$\\cos \\varphi = 1/\\sqrt 2 \\approx 0{,}71$."],
    related=["hb-geometry-vectors"],
))
GEOM.append(mk(
    id="geom-vec-perp", topic="geometry", examNumber=2, examLevel="профиль",
    subtopic="Перпендикулярность", difficulty="medium",
    statement="При каком $m$ векторы $\\vec a = (2; m)$ и $\\vec b = (3; 6)$ перпендикулярны?",
    answer=-1, tolerance=0.01,
    hint1="Перпендикулярность: скалярное произведение равно 0.",
    hint2="$2 \\cdot 3 + m \\cdot 6 = 0$.",
    hint3="$6 + 6m = 0$, $m = -1$.",
    solution=["$6 + 6m = 0$, $m = -1$."],
    related=["hb-geometry-vectors"],
))

# Extra planimetry — combined number
GEOM.append(mk(
    id="geom-rhombus-side", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Ромб", difficulty="medium",
    statement="Диагонали ромба равны 6 и 8. Найдите его сторону.",
    answer=5, tolerance=0.01,
    hint1="Диагонали в ромбе перпендикулярны и делят друг друга пополам.",
    hint2="Половинки: 3 и 4 — катеты прямоугольного треугольника.",
    hint3="$a = \\sqrt{3^2 + 4^2} = 5$.",
    solution=["Половины диагоналей: 3 и 4.", "$a = \\sqrt{9+16} = 5$."],
    related=["hb-geometry-planimetry"],
))
GEOM.append(mk(
    id="geom-circumscribed-right", topic="geometry", examNumber=1, examLevel="профиль",
    subtopic="Описанная окружность", difficulty="hard",
    statement="В прямоугольном треугольнике гипотенуза равна 10. Найдите радиус описанной окружности.",
    answer=5, tolerance=0.01,
    hint1="В прямоугольном треугольнике центр описанной окружности — середина гипотенузы.",
    hint2="$R = c/2$.",
    hint3="$R = 10/2 = 5$.",
    solution=["$R = c/2 = 5$."],
    related=["hb-geometry-planimetry"],
))

# ===========================================================================
# Write files
# ===========================================================================

def main() -> None:
    files = {
        "lib/tasks/probability.ts": ("probability", PROB),
        "lib/tasks/statistics.ts": ("statistics", STAT),
        "lib/tasks/economics.ts": ("economics", ECON),
        "lib/tasks/geometry.ts": ("geometry", GEOM),
    }
    for rel, (topic, tasks) in files.items():
        path = ROOT / rel
        path.write_text(render(topic, tasks))
        print(f"{rel}: {len(tasks)} tasks")


if __name__ == "__main__":
    main()
