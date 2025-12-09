export function calcularFeriasService({ salario, diasFerias, abono = 0 }) {
  const salarioNum = Number(salario);
  const diasNum = Number(diasFerias);
  const abonoNum = Number(abono);

  if (!salarioNum || !diasNum) {
    throw new Error("Salário e dias de férias são obrigatórios.");
  }

  if (diasNum + abonoNum > 30) {
    throw new Error(
      "A soma de dias de férias e abono não pode ultrapassar 30 dias."
    );
  }

  if (salarioNum < 0 || diasNum < 0 || abonoNum < 0) {
    throw new Error("Valores negativos não são permitidos.");
  }

  // Valor das férias
  const valorBase = (salarioNum / 30) * diasNum;

  // 1/3 constitucional correto
  const tercoConstitucional = valorBase / 3;

  const valorBrutoFerias = valorBase + tercoConstitucional;

  // INSS simplificado para exemplo (pode trocar por cálculo progressivo)
  const impostoINSS = valorBrutoFerias * 0.09;

  const valorLiquidoFerias = valorBrutoFerias - impostoINSS;

  let dadosAbono = null;
  let valorLiquidoFinal = valorLiquidoFerias;

  if (abonoNum > 0) {
    const valorAbono = (salarioNum / 30) * abonoNum;
    const tercoAbono = valorAbono / 3;
    const totalAbono = valorAbono + tercoAbono;

    valorLiquidoFinal += totalAbono;

    dadosAbono = {
      valorAbono: Number(valorAbono.toFixed(2)),
      tercoConstitucionalAbono: Number(tercoAbono.toFixed(2)),
      totalAbono: Number(totalAbono.toFixed(2)),
    };
  }

  return {
    salarioBase: salarioNum,
    diasFerias: diasNum,
    valorBrutoFerias: Number(valorBrutoFerias.toFixed(2)),
    descontos: {
      impostoINSS: Number(impostoINSS.toFixed(2)),
    },
    abono: dadosAbono,
    valorLiquidoFinal: Number(valorLiquidoFinal.toFixed(2)),
  };
}
