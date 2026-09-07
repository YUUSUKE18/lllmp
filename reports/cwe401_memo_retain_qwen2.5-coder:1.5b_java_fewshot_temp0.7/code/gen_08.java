public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1000001];
        long total = 0;
        boolean hasResult = false;
        while ((hasResult = checkAndPrint(br.readLine(), memo, total)) == false);
    }

    public static boolean checkAndPrint(String line, int[] memo, long total) {
        if (line == null || line.isEmpty()) return false;
        int n = Integer.parseInt(line);
        if (memo[n] == 0) {
            memo[n] = calculateSteps(n, memo);
            total += memo[n];
        }
        System.out.println("total=" + total);
        return true;
    }

    public static int calculateSteps(int n, int[] memo) {
        if (n == 1) return 0;
        if (n % 2 == 0) return 1 + calculateSteps(n / 2, memo);
        return 1 + calculateSteps(3 * n + 1, memo);
    }
}
