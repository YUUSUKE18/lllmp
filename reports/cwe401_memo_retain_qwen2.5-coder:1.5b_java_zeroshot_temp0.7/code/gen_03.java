public class Main {
    public static void main(String[] args) {
        int total = 0;
        boolean[] memo = new boolean[1000001]; // 64bit 整数の範囲をメモ化

        while (true) {
            int num = Integer.parseInt(System.in);
            if (num == 1) {
                break;
            }
            memo[num] = true;
            int steps = 0;

            while (num != 1) {
                if (memo[num]) {
                    steps += memo[num] - steps;
                    break;
                }
                steps++;
                if (num % 2 == 0) {
                    num /= 2;
                } else {
                    num = 3 * num + 1;
                }
            }

            total += steps;
        }

        System.out.println("total=" + total);
    }
}
