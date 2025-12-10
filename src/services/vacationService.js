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

  // Cálculo base das férias
  const valorBase = (salarioNum / 30) * diasNum;
  const tercoConstitucional = valorBase / 3;
  const valorBrutoFerias = valorBase + tercoConstitucional;

  // INSS progressivo
  const faixas = [
    { limite: 1412.0, aliquota: 0.075 },
    { limite: 2666.68, aliquota: 0.09 },
    { limite: 4000.03, aliquota: 0.12 },
    { limite: 7786.02, aliquota: 0.14 },
  ];

  let totalINSS = 0;
  let baseAnterior = 0;

  for (const faixa of faixas) {
    if (valorBrutoFerias <= baseAnterior) break;

    const parteDaFaixa =
      Math.min(valorBrutoFerias, faixa.limite) - baseAnterior;

    totalINSS += parteDaFaixa * faixa.aliquota;
    baseAnterior = faixa.limite;
  }

  const valorBaseIR = valorBrutoFerias - totalINSS;

  // IRPF
  let impostoIRPF = 0;

  if (valorBaseIR <= 2259.2) {
    impostoIRPF = 0;
  } else if (valorBaseIR <= 2826.65) {
    impostoIRPF = valorBaseIR * 0.075 - 169.44;
  } else if (valorBaseIR <= 3751.05) {
    impostoIRPF = valorBaseIR * 0.15 - 381.44;
  } else if (valorBaseIR <= 4664.68) {
    impostoIRPF = valorBaseIR * 0.225 - 662.77;
  } else {
    impostoIRPF = valorBaseIR * 0.275 - 896.0;
  }

  if (impostoIRPF < 0) impostoIRPF = 0;

  const valorLiquidoFerias = valorBrutoFerias - totalINSS - impostoIRPF;

  // Abono pecuniário
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
      impostoINSS: Number(totalINSS.toFixed(2)), // CORRIGIDO
      impostoIRPF: Number(impostoIRPF.toFixed(2)),
    },
    abono: dadosAbono,
    valorLiquidoFinal: Number(valorLiquidoFinal.toFixed(2)),
  };
}
