public class Main {
    public static void main(String[] args) {
        long total = 0;
        boolean[] memo = new boolean[1000001];
        while (true) {
            String input = System.console().readLine();
            if (input.isEmpty()) {
                break;
            }
            int n = Integer.parseInt(input);
            if (n == 1) {
                total += 0;
            } else if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            memo[n] = true;
            total += n;
        }
        System.out.println("total=" + total);
    }
}
