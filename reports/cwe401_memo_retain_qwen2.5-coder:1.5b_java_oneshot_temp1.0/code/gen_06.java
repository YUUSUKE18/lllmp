public class Main {
    public static void main(String[] args) {
        int[] memo = new int[1000001];
        int total = 0;
        while (true) {
            String line = new BufferedReader(new InputStreamReader(System.in)).readLine();
            if (line == null || line.isEmpty()) break;
            int n = Integer.parseInt(line.trim());
            if (memo[n] == 0) {
                int count = 0;
                while (n != 1) {
                    memo[n] = count;
                    if (n % 2 == 0) n /= 2;
                    else n = 3 * n + 1;
                    count++;
                }
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
