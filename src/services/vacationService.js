export function calcularFeriasService({ salario, diasFerias, abono = 0 }) {
  // Converte strings para números
  const salarioNum = Number(salario);
  const diasNum = Number(diasFerias);
  const abonoNum = Number(abono);

  if (!salarioNum || !diasNum) {
    throw new Error("Salário e dias de férias são obrigatórios.");
  }

  // Regra de negócio: Soma de dias + abono não pode passar de 30
  if (diasNum + abonoNum > 30) {
    throw new Error(
      "A soma de dias de férias e abono não pode ultrapassar 30 dias."
    );
  }

  // Valores negativos não são permitidos
  if (salarioNum < 0 || diasNum < 0 || abonoNum < 0) {
    throw new Error("Valores negativos não são permitidos.");
  }

  // 1. Cálculo das Férias (Dias de descanso)
  const valorBase = Math.floor((salarioNum / 30) * diasNum);
  const tercoConstitucional = Math.floor(valorBase / 3);
  const valorBrutoFerias = valorBase + tercoConstitucional;

  // 2. Descontos (INSS simplificado 9%)
  const impostoINSS = valorBrutoFerias * 0.09;
  const valorLiquidoFerias = valorBrutoFerias - impostoINSS;

  // 3. Cálculo do Abono (Venda de dias - Isento de INSS/IRRF geralmente)
  let dadosAbono = null;
  let totalLiquidoFinal = valorLiquidoFerias;

  if (abonoNum > 0) {
    const valorAbono = (salarioNum / 30) * abonoNum;
    const tercoAbono = valorAbono / 3;
    const totalAbono = valorAbono + tercoAbono;

    // Soma ao líquido final
    totalLiquidoFinal += totalAbono;

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
    valorLiquidoFinal: Number(totalLiquidoFinal.toFixed(2)),
  };
}
