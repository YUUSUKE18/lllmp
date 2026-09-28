public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int goal = Integer.parseInt(line.trim());
        int count = 0;
        for (int i = 0; i < goal - 1; i++) {
            for (int j = i + 1; j < goal; j++) {
                int sum = i + j;
                if (sum == goal) count++;
            }
        }
        System.out.println("pairs=" + count);
    }
}
