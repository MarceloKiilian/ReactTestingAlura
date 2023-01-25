import React from "react";
import App, { calcularNovoSaldo } from './App'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Componente principal', () => {
    describe('Quando eu abro o app do banco, ', () => {
        it('o nome é exibido', () => {
            render(<App />);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
        it('o saldo é exibido', () => {
            render(<App />);
            expect(screen.getByText('Saldo:')).toBeInTheDocument()
        })
        it('o botão de transacao é exibido', () => {
            render(<App />);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })
    describe('Quando eu realizo uma transação', () => {
        it('que e um saque o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(100);
        })
        it('de deposito, o valor vai aumentar', () => {
            const valores = {
                transacao: 'deposito',
                valor: 100
            }

            const novoSaldo = calcularNovoSaldo(valores, 100)

            expect(novoSaldo).toBe(200);
        })

        it('que é um saque, a transação deve ser realizada', () => {

            render(<App />)

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000')

            fireEvent.click(transacao, { target: { value: 'Saque' } })
            fireEvent.change(valor, { target: { value: 10 } })
            fireEvent.click(botaoTransacao)


            expect(saldo.textContent).toBe('R$ 990')
        })

        // Atividade: teste de um saque maior do que o valor da conta
        it("de saque com valor maior que o saldo da conta", () => {
            render(<App />);
            const saldo = screen.getByText("R$ 1000");
            const transacao = screen.getByLabelText("Saque");
            const valor = screen.getByTestId("valor");
            const botaoTransacao = screen.getByText("Realizar operação");
            expect(saldo.textContent).toBe("R$ 1000");
            // simular a ação do usuário
            fireEvent.click(transacao, { target: { value: "saque" } });
            fireEvent.change(valor, { target: { value: 1000 } });
            fireEvent.click(botaoTransacao);
            const saldoSplitted = saldo.textContent.split(" ");
            expect(parseInt(saldoSplitted[1])).toBeGreaterThanOrEqual(0);
        });

        // peguei no forum para testar (mudando o valor no front)
        // it('que é um saque, com o valor maior que o saldo, este é negativado', () => {
        //     render(<App />)

        //     const saldo = screen.getByText('R$ 1000')
        //     const transacao = screen.getByLabelText('Saque')
        //     const valor = screen.getByTestId('valor')
        //     const botaoTransacao = screen.getByText('Realizar operação')

        //     expect(saldo.textContent).toBe('R$ 1000')
        //     fireEvent.click(transacao, { target: { value: 'Saque' } });
        //     fireEvent.change(valor, { target: { value: 2000 } });
        //     fireEvent.click(botaoTransacao);

        //     expect(saldo.textContent).toBe('R$ -1000');
        // })
    })
})