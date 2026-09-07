public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        int memo[] = new int[10000000]; // メモ化用配列
        int memoSize = 0;
        try {
            while (true) {
                String line = br.readLine();
                if (line == null) break;
                if (line.isEmpty()) continue;
                try {
                    long n = Long.parseLong(line.trim());
                    if (memo[n] == 0) {
                        long steps = 0;
                        long current = n;
                        while (current != 1) {
                            if (current % 2 == 0) {
                                current /= 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            steps++;
                        }
                        memo[n] = steps;
                    }
                    total += memo[n];
                } catch (NumberFormatException e) {
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("total=" + total);
    }
}
